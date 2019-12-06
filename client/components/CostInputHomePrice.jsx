import React from 'react';
import styled from 'styled-components';
import formatNum from '../util.currency';

const Container = styled.span`
  width: 100%;
  flex-basis: 100%;
  margin-top: 10px;
`;

const Box = styled.span`
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  display: block;
  padding: 10px 8px 9px;
  background-color: #fff;
  box-sizing: border-box;
  position: relative;
`;

// eslint-disable-next-line no-unused-vars
const Input = styled.input`
  font: 400 11px system-ui;
`;

// eslint-disable-next-line no-unused-vars
const Slider = styled.input`
  background: transparent;
  margin-top: 16px;
  margin-bottom: 0;
  color: rgb(144, 144, 144);
`;

const HomePrice = (props) => {
  const { cost, handleCostSubmit, redfinCostEstimate } = props;
  const [costForm, setCost] = React.useState(cost);
  const [costSlider, setCostSlider] = React.useState(cost);
  const [inputSelected, setInputSelected] = React.useState(false);


  const handleTextChange = (e) => {
    setCost(e.target.value);
  };

  const handleTextEnter = (e) => {
    if (e.key === 'Enter') {
      handleCostSubmit(costForm);
    }
  };

  const handleSliderChange = (e) => {
    const newCost = e.target.value;
    setCostSlider(newCost);
    setCost(newCost);
  };

  const handleInputDeselect = () => {
    setInputSelected(false);
    handleCostSubmit(costForm);
  };

  return (
    <Container>
      <span>Home Price</span>
      <Box>
        <input
          type="text"
          id="cost"
          name="cost"
          value={inputSelected ? costForm : formatNum(costForm)}
          onChange={handleTextChange}
          onKeyDown={handleTextEnter}
          onBlur={handleInputDeselect}
          onFocus={() => setInputSelected(true)}
        />
      </Box>
      <input
        type="range"
        id="costSlider"
        name="costSlider"
        min={redfinCostEstimate * 0.8}
        max={redfinCostEstimate * 1.2}
        value={costSlider}
        step={1000}
        onChange={handleSliderChange}
        onMouseUp={() => handleCostSubmit(costForm)}
      />
    </Container>
  );
};

export default HomePrice;
