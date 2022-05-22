pragma solidity >=0.8.0 <0.9.0;
// SPDX-License-Identifier: MIT
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract DEX {

  using SafeMath for uint256;
  IERC20 token;

  constructor(address chipToken_addr, address energyToken_addr) {
    chipToken = IERC20(chipToken_addr);
    energyToken = IERC20(energyToken_addr);
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
  function deposit() public payable returns (uint256) {
      uint256 token_reserve = token.balanceOf(address(this));
      uint256 matic_reserve = address(this).balance.sub(msg.value);
      uint256 token_amount = (msg.value.mul(token_reserve) / matic_reserve).add(1);
      uint256 liquidity_minted = msg.value.mul(totalLiquidity) / matic_reserve;
      liquidity[msg.sender] = liquidity[msg.sender].add(liquidity_minted);
      totalLiquidity = totalLiquidity.add(liquidity_minted);
      require(token.transferFrom(msg.sender, address(this), token_amount));
      return liquidity_minted;
  }
  
  function withdraw(uint256 amount) public returns(uint256, uint256) {
      uint256 token_reserve = token.balanceOf(address(this));
      uint256 matic_amount = amount.mul(address(this).balance) / totalLiquidity;
      uint256 token_amount = amount.mul(token_reserve) / totalLiquidity;
      liquidity[msg.sender] = liquidity[msg.sender].sub(matic_amount);
      totalLiquidity = totalLiquidity.sub(matic_amount);
      // Need to confirm if the line below works: had error with msg.sender.transfer(matic_amount); <-- original code
      payable (msg.sender).transfer(matic_amount);
      require(token.transfer(msg.sender, token_amount));
      return (matic_amount, token_amount);
  }

  //TODO: incentivise rewards

  //TODO: allow swap between more pairs, e.g. energy and chip
  

}