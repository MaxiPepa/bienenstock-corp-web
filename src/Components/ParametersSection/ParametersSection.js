import React from "react";

import {
  ArrowCircleUpIcon,
  ArrowCircleDownIcon,
  RemoveShoppingCartRoundedIcon,
  ShoppingCartRoundedIcon,
  ReceiptRoundedIcon,
  PriceCheckIcon,
} from "Assets/Icons";

import ParametersCard from "./ParametersCard/ParametersCard";

import "./ParametersSection.css";

const ParametersSection = ({ parameters }) => {
  return (
    <div className="parameters-container">
      <div className="parameters-section">
        <span>Sales parameters</span>
        <div className="parameters">
          <ParametersCard
            icon={<PriceCheckIcon />}
            title="Total completed Sales"
            value={parameters.sales.total}
            iconColor={"#49cc90"}
          />
          <ParametersCard
            icon={<ReceiptRoundedIcon />}
            title="Total cancelled Sales"
            value={parameters.sales.cancelled}
            iconColor={"#d94233"}
          />
          <ParametersCard
            icon={<ArrowCircleUpIcon />}
            title="Sales gains"
            value={"$" + parameters.sales.income}
            iconColor={"#49cc90"}
          />
        </div>
      </div>
      <div className="parameters-section">
        <span>Purchases parameters</span>
        <div className="parameters">
          <ParametersCard
            icon={<ShoppingCartRoundedIcon />}
            title="Total completed purchases"
            value={parameters.purchases.total}
            iconColor={"#49cc90"}
          />
          <ParametersCard
            icon={<RemoveShoppingCartRoundedIcon />}
            title="Total cancelled purchases"
            value={parameters.purchases.cancelled}
            iconColor={"#d94233"}
          />
          <ParametersCard
            icon={<ArrowCircleDownIcon />}
            title="Purchases cost"
            value={"$" + parameters.purchases.income}
            iconColor={"#d94233"}
          />
        </div>
      </div>
    </div>
  );
};

export default ParametersSection;
