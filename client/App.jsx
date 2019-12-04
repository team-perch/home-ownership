/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyId: props.id,
      zipCode: '',
      redfinCostEstimate: null,
      insuranceRate: null,
      propertyTaxRate: null,
      cost: 80000,
      term: 30,
      type: 'Fixed',
      downPay: 20,
      credit: 740,
      origYear: 2019,
      rates: [],
    };

    this.getPropertyData = this.getPropertyData.bind(this);
    this.getRates = this.getRates.bind(this);
  }

  async componentDidMount() {
    const { propertyId } = this.state;
    await this.getPropertyData(propertyId);
    await this.getRates();
  }

  async getPropertyData(id) {
    try {
      const res = await axios.get(`/api/costHomeOwnership/properties?id=${id}`);
      const {
        propertyId,
        zipCode,
        redfinCostEstimate,
        insuranceRate,
        propertyTaxRate,
      } = await res.data[0];

      this.setState({
        propertyId,
        zipCode,
        redfinCostEstimate,
        insuranceRate,
        propertyTaxRate,
        cost: redfinCostEstimate,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getRates() {
    const {
      cost, zipCode, term, type, downPay, credit, origYear,
    } = this.state;

    const queries = {
      cost, zipCode, term, type, downPay, credit, origYear,
    };

    const queryString = Object.keys(queries)
      .map((k) => `${k}=${queries[k]}`)
      .join('&');

    try {
      const res = await axios.get(`/api/costHomeOwnership/rates?${queryString}`);
      const rates = await res.data;
      this.setState({ rates });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const {
      rates,
      redfinCostEstimate,
      insuranceRate,
      propertyTaxRate,
    } = this.state;
    return (
      <div>hi from react</div>
    );
  }
}

export default App;
