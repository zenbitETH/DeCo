pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DEX {

  using SafeMath for uint256;
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

  function price(
      uint256 input_amount,
      uint256 input_reserve,
      uint256 output_reserve) public view returns (uint256) {
        uint256 input_amount_with_fee = input_amount.mul(997);
        uint256 numerator = input_amount_with_fee.mul(output_reserve);
        uint256 denominator = input_reserve.mul(1000).add(input_amount_with_fee);
        return numerator / denominator;
  }

  function maticToToken() public payable returns (uint256) {
      uint256 token_reserve = token.balanceOf(address(this));
      uint256 tokens_bought = price(msg.value, address(this).balance.sub(msg.value), token_reserve);
      require(token.transfer(msg.sender, tokens_bought));
      return tokens_bought;
  }

  function tokenToMatic(uint256 tokens) public returns (uint256) {
      uint256 token_reserve = token.balanceOf(address(this));
      uint256 matic_bought = price(tokens, token_reserve, address(this).balance);
      payable(msg.sender).transfer(matic_bought);
      require(token.transferFrom(msg.sender, address(this), tokens));
      return matic_bought;
  }

  //TODO: allow deposits

  //TODO: incentivise rewards

  //TODO: allow swap between more pairs, e.g. energy and chip
  

}