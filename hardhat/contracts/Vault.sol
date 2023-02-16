// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./productNFT.sol";
// import { IAaveLendingPool } from "./IAaveLendingPool.sol";


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

interface UsdcTokenVault {
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function transfer(address recipient, uint256 amount) external returns (bool);
  function allowance(address owner, address spender) external view returns (uint256);
  function approve(address spender, uint256 amount) external returns (bool);

  function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) external returns (bool);
}

interface ILendingPool {

  /**
   * @dev Deposits an `amount` of underlying asset into the reserve, receiving in return overlying aTokens.
   * - E.g. User deposits 100 USDC and gets in return 100 aUSDC
   * @param asset The address of the underlying asset to deposit
   * @param amount The amount to be deposited
   * @param onBehalfOf The address that will receive the aTokens, same as msg.sender if the user
   *   wants to receive them on his own wallet, or a different address if the beneficiary of aTokens
   *   is a different wallet
   * @param referralCode Code used to register the integrator originating the operation, for potential rewards.
   *   0 if the action is executed directly by the user, without any middle-man
   **/
  function deposit(
    address asset,
    uint256 amount,
    address onBehalfOf,
    uint16 referralCode
  ) external;

  /**
   * @dev Withdraws an `amount` of underlying asset from the reserve, burning the equivalent aTokens owned
   * E.g. User has 100 aUSDC, calls withdraw() and receives 100 USDC, burning the 100 aUSDC
   * @param asset The address of the underlying asset to withdraw
   * @param amount The underlying amount to be withdrawn
   *   - Send the value type(uint256).max in order to withdraw the whole aToken balance
   * @param to Address that will receive the underlying, same as msg.sender if the user
   *   wants to receive it on his own wallet, or a different address if the beneficiary is a
   *   different wallet
   * @return The final amount withdrawn
   **/
  function withdraw(
    address asset,
    uint256 amount,
    address to
  ) external returns (uint256);
}

contract Vault {

    DaiTokenVault public daiTokenVault;
    productNFT private _productNFT;
    ILendingPool public iLendingPool;
    UsdcTokenVault public usdcVault;

    // 0x0b913A76beFF3887d35073b8e5530755D60F78C7 - V3 Polygon Mumbai Pool contract
    // 0xF14f9596430931E177469715c591513308244e8F - V3 DAI contract
    // 0xe9DcE89B076BA6107Bb64EF30678efec11939234 - V3 USDC contract


    // 0xCAd01dAdb7E97ae45b89791D986470F3dfC256f7 - V3 Optimism Göerli
    // 0xD9662ae38fB577a3F6843b6b8EB5af3410889f3A - V3 Optimism DAI 
    // 0xc5Bf9eb35c7d3a90816436E2a124bdd136e09fFD - V3 Wrapped ETH



        // V2 addresses
        // daiTokenVault = DaiTokenVault(0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F);
        // iLendingPool = ILendingPool(0x9198F13B08E299d85E096929fA9781A1E3d5d827);
        // usdcVault = UsdcTokenVault(0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e);
        //  0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889 - V2 wrappedMatic   


    mapping(address => bool) daiApproved;
    mapping(address => uint256) userSupplyAvailability;

    constructor(address _productAddress){
        setProductContract(_productAddress);
        daiTokenVault = DaiTokenVault(0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F);
        iLendingPool = ILendingPool(0x9198F13B08E299d85E096929fA9781A1E3d5d827);
        usdcVault = UsdcTokenVault(0xe9DcE89B076BA6107Bb64EF30678efec11939234);
        // usdc erc20 contract: 0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e
    }
    
    function setProductContract(address _productAddress) public {
        _productNFT = productNFT(_productAddress);
    }
    
    function buy(uint256 serviceId, uint256 _businessId, address _buyerAddress) public  {
        require(_productNFT.getOwnerOfService(serviceId) != msg.sender, "You cannot buy your own service");
        // require for nonexistentBusiness
        uint256 price = _productNFT.getPriceForAService(serviceId);
        require(daiTokenVault.balanceOf(msg.sender) >= price, "you want to pay less than the actual price");
        require(daiTokenVault.allowance(msg.sender, address(this)) >= price, "You don't have enough allowance to buy this product");
        address  receiver = _productNFT.getOwnerOfService(serviceId);

        daiTokenVault.transferFrom(msg.sender, receiver, price / 10 * 9);
        daiTokenVault.transferFrom(msg.sender, address(this), price / 10);
        // receiver.transfer(msg.value / 10 * 9);  90% to seller 10% to Vault
        if(daiApproved[_buyerAddress] == false){
            daiApproved[_buyerAddress] = true;
        }
        _productNFT.buyService(serviceId, _businessId);
    }

    function getVaultBalance() public view returns(uint256){
        return daiTokenVault.balanceOf(address(this));
    }

    function sendSomethingOut(address _address, uint256 daiAmount) public payable {
        usdcVault.transfer(_address, daiAmount);
    }

    function checkBuyAllowance(address buyerAddress) public view returns(bool){
        return daiApproved[buyerAddress];
    }

    function aaveSupply(uint256 _amount) public {
        // require(userSupplyAvailability[_sender] > 0, "You do not have any allowance to supply any DAI to the pool");
        iLendingPool.deposit(0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F, _amount, msg.sender, 0);
        // asset address is the DAI address in this example
        // onBehalfOf address is
        // referralCode is always 0
    }
    function aaveWithdraw(uint256 _amount) public {
        iLendingPool.withdraw(0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F, _amount, msg.sender);
    }
}


