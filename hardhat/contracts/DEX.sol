pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DEX {

  IERC20 token;

  constructor(address token_addr) {
    token = IERC20(token_addr);
  }

  uint256 public totalLiquidity;
  mapping (address => uint256) public liquidity;

  function init(uint256 tokens) public payable returns (uint256) {
      require(totalLiquidity==0, "Liquidity already deployed!");
      totalLiquidity = address(this).balance;
      liquidity[msg.sender] = totalLiquidity;
      require(token.transferFrom(msg.sender, address(this), tokens));
      return totalLiquidity;
  }

}