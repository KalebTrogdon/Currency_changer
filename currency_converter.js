// Function to fetch live exchange rates from an API
async function fetchExchangeRates(baseCurrency = 'USD') {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates. Please try again later.');
      }
      const data = await response.json();
      return data.rates;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw new Error('Failed to fetch exchange rates. Please try again later.');
    }
  }
  
  // Function to perform the conversion using live exchange rates
  async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
      const exchangeRates = await fetchExchangeRates(fromCurrency);
      
      if (!exchangeRates) {
        throw new Error("Failed to fetch exchange rates. Please try again later.");
      }
      
      if (!exchangeRates[toCurrency]) {
        throw new Error("Invalid 'To' currency!");
      }
  
      const usdAmount = fromCurrency === 'USD' ? amount : amount / exchangeRates[fromCurrency];
      const convertedAmount = usdAmount * exchangeRates[toCurrency];
  
      return convertedAmount;
    } catch (error) {
      console.error('Conversion error:', error);
      throw error;
    }
  }
  
  // Function to display the result and handle errors
  async function currencyConverter() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
  
    try {
      const result = await convertCurrency(amount, fromCurrency, toCurrency);
      document.getElementById("result").innerText = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
      document.getElementById("result").innerText = error.message;
    }
  }
  