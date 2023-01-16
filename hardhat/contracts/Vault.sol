// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./productNFT.sol";
import { IAaveLendingPool } from "./IAaveLendingPool.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


 interface DaiTokenVault {
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) external returns (bool);
}

contract Vault is Ownable {

    DaiTokenVault public daiTokenVault;
    productNFT private _productNFT;
    // IAaveLendingPool private aaveLendingPool;

    mapping(address => uint256) daiBalance;

    constructor(address _productAddress){
        setProductContract(_productAddress);
        daiTokenVault = DaiTokenVault(0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F);
    }
    
    function setProductContract(address _productAddress) public {
        _productNFT = productNFT(_productAddress);
    }

    // function setAaveContract(address _aaveAddress) public {
    //     aaveLendingPool = IAaveLendingPool(_aaveAddress);
    // }

    // function borrowTest() public {
        // Here we need to add a requirity that each user can borrow things up how much daiTokenBalance they are having in the Vault contract
    // }
    
    function buy(uint256 serviceId, uint256 _businessId) public payable {
        require(_productNFT.getOwnerOfService(serviceId) != msg.sender, "You cannot buy your own service");
        // require for nonexistentBusiness
        uint256 price = _productNFT.getPriceForAService(serviceId);
        require(daiTokenVault.balanceOf(msg.sender) >= price, "you want to pay less than the actual price");
        // require(daiTokenVault.allowance(msg.sender, address(this)) >= price, "You don't have enough allowance to buy this product");
        address payable receiver = _productNFT.getOwnerOfService(serviceId);


        daiTokenVault.transferFrom(msg.sender, receiver, price / 10 * 9); // 90% goes into the user's Wallet. 
        daiTokenVault.transferFrom(msg.sender, address(this), price / 10); // 10% goes to the Vault after the transaction

        daiBalance[msg.sender] += price / 10; // This mapping lets you know that how much DAI each user has access in the Vault 

        // receiver.transfer(msg.value / 10 * 9);  90% to seller 10% to Vault ( only user can access it, not 
        _productNFT.buyService(serviceId, _businessId);
    }

    function getVaultBalance() public view returns(uint256){
        return daiTokenVault.balanceOf(address(this));
    }
    function sendSomethingOut(address payable _address, uint256 daiAmount) public payable onlyOwner {
        daiTokenVault.transfer(_address, daiAmount);
    }
    
    function checkYourVaultDaiBalance() public view returns (uint256){ // We might need to add an argument here for address, but we need to check this later
        return daiBalance[msg.sender];
    }

}
