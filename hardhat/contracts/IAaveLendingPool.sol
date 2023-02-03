pragma solidity <=0.8.10;

interface IAaveLendingPool {
    
    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;


    function borrow(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode,
        address onBehalfOf
    ) external;

    function repay(
    address asset,
    uint256 amount,
    uint256 rateMode,
    address onBehalfOf
    ) external returns (uint256);

    function withdraw(
    address asset,
    uint256 amount,
    address to
  ) external returns (uint256);
}