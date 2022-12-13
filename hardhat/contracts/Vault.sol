// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./productNFT.sol";
import { IAaveLendingPool } from "./IAaveLendingPool.sol";

//import "./testBuying.sol";

contract Vault {

    productNFT private _productNFT;
    // IAaveLendingPool private aaveLendingPool;

    constructor(address _productAddress){
        setProductContract(_productAddress);
    }
    
    function setProductContract(address _productAddress) public {
        _productNFT = productNFT(_productAddress);
    }

    // function setAaveContract(address _aaveAddress) public {
    //     aaveLendingPool = IAaveLendingPool(_aaveAddress);
    // }

    // function borrowTest() public {

    // }
    
    function buy(uint256 serviceId, uint256 _businessId) public payable {
        require(_productNFT.getOwnerOfService(serviceId) != msg.sender, "You cannot buy your own service");
        // require for nonexistentBusiness
        require(msg.value >= _productNFT.getPriceForAService(serviceId), "you want to pay less than the actual price");
        address payable receiver = _productNFT.getOwnerOfService(serviceId);
        receiver.transfer(msg.value / 10 * 9); // 90% to seller 10% to Vault
        _productNFT.buyService(serviceId, _businessId);
    }

    function getVaultBalance() public view returns(uint256){
        return address(this).balance;
    }
    function sendSomethingOut(address payable _address, uint256 maticAmount) public payable {
        _address.transfer(maticAmount);
    }
}


