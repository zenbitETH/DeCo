// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./itemNFT.sol";

 interface DaiTokenVault {
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns(bool);
    function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) external returns (bool);
}

  interface aPolDAI {
    function balanceOf(address user) external view returns (uint256);
  }

interface ILendingPool {

  function deposit(
    address asset,
    uint256 amount,
    address onBehalfOf,
    uint16 referralCode
  ) external;

  function supply(
    address asset,
    uint256 amount,
    address onBehalfOf,
    uint16 referralCode
  ) external;

  function withdraw(
    address asset,
    uint256 amount,
    address to
  ) external returns (uint256);
}

contract Vault {

    DaiTokenVault public daiTokenVault;
    itemNFT private _itemNFT;
    ILendingPool public iLendingPool;
    aPolDAI public _apolDAI;


    // 0xF14f9596430931E177469715c591513308244e8F - V3 DAI contract
    // daiTokenVault V2 = DaiTokenVault(0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F);
    // aPolDAI contract = 0xFAF6a49b4657D9c8dDa675c41cB9a05a94D3e9e9

    mapping(address => bool) daiApproved;
    mapping(address => uint256) userSupplyAvailability;
    mapping(address => bool) contractApproved;
    mapping(address => uint256) totalSales;
    mapping(address => bool) hasSupplied;

    uint256 totalBalance = 0;

    constructor(address _itemAddress){
        setContracts(_itemAddress);
        daiTokenVault = DaiTokenVault(0xF14f9596430931E177469715c591513308244e8F);
        iLendingPool = ILendingPool(0x0b913A76beFF3887d35073b8e5530755D60F78C7);
        _apolDAI = aPolDAI(0xFAF6a49b4657D9c8dDa675c41cB9a05a94D3e9e9);
    }
    
    function setContracts(address _itemAddress) public {
        _itemNFT = itemNFT(_itemAddress);
    }
    
    function buy(uint256 _businessId, uint256 serviceId, address _buyerAddress) public  {
        require(_itemNFT.getOwnerOfService(serviceId) != _buyerAddress, "You cannot buy your own service");
        // require for nonexistentBusiness
        uint256 price = _itemNFT.getPriceForAService(serviceId);
        // require(daiTokenVault.balanceOf(msg.sender) >= price, "you want to pay less than the actual price");
        // require(daiTokenVault.allowance(msg.sender, address(this)) >= price, "You don't have enough allowance to buy this product");
        address receiver = _itemNFT.getOwnerOfService(serviceId);

        userSupplyAvailability[receiver] += price ; // 100% goes into Vault now
        totalBalance += price;
        totalSales[receiver]+= price;

        daiTokenVault.transferFrom(msg.sender, address(this), price);
        // daiTokenVault.transferFrom(msg.sender, receiver, price / 10 * 9); // 90% DAI to the receiver
        // daiTokenVault.transferFrom(msg.sender, address(this), price / 10); // 10% DAI to the Vault
        // receiver.transfer(msg.value / 10 * 9);  90% to seller 10% to Vault
        if(daiApproved[_buyerAddress] == false){
            daiApproved[_buyerAddress] = true;
        }
        _itemNFT.buyService(_businessId, serviceId);
    }

    function getVaultBalance() public view returns(uint256){
        return daiTokenVault.balanceOf(address(this));
    }

    function sendDaiOut(address _address, uint256 daiAmount) public payable {
        require(userSupplyAvailability[_address] >= daiAmount, "You do not have that much DAI in the vault which you can send out");
        userSupplyAvailability[_address] -= daiAmount;
        daiTokenVault.transfer(_address, daiAmount);
    }

    function checkBuyAllowance(address buyerAddress) public view returns(bool){
        return daiApproved[buyerAddress];
    }

    function approveAaveContract(address _caller, uint256 _amount) public {
      daiTokenVault.approve(0x0b913A76beFF3887d35073b8e5530755D60F78C7, _amount);
      if(contractApproved[_caller] == false){
        contractApproved[_caller] = true;
      }
    }

    function getTotalSales(address _owner) public view returns (uint256){
      return totalSales[_owner];
    }

    function IsAaveApproved(address _caller) public view returns(bool){
      return contractApproved[_caller];
    }

    function getAaaveAvailibility(address _user) public view returns(uint256){
      return userSupplyAvailability[_user];
    }

    function aaveDeposit(address _address, uint256 _amount) public {
        require(userSupplyAvailability[_address] >= _amount, "You do not have any allowance to supply any DAI to the pool");

        iLendingPool.deposit(0xF14f9596430931E177469715c591513308244e8F, _amount, msg.sender, 0);
        userSupplyAvailability[_address] -= _amount;
        totalBalance -= _amount;
        hasSupplied[msg.sender] = true;
    }

    function aaveWithdraw(uint256 _amount) public {
        iLendingPool.withdraw(0xF14f9596430931E177469715c591513308244e8F, _amount, msg.sender);
    }

    function getTotalBalance() public view returns (uint256){
      return totalBalance;
    }

    function getWithdrawBalance() public view returns (uint256){
      return _apolDAI.balanceOf(msg.sender);
    }

    function getYourDaiBalance(address _user) public view returns (uint256){
      return daiTokenVault.balanceOf(_user);
    }

    function directSupply(uint256 _amount) public {
      iLendingPool.deposit(0xF14f9596430931E177469715c591513308244e8F, _amount, msg.sender, 0);
    }

    function isSupplied() public view returns(bool){
      return hasSupplied[msg.sender];
    }
}

