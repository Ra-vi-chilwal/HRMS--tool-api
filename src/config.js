const dev = {
    API_URL: "http://localhost:5000",
    UI_URL: "http://localhost:3000",
  };
  
  const prod = {
    API_URL: "/api",
    UI_URL: "/",
  };
  const config = process.env.NODE_ENV == "development" ? dev : prod;
  export default config;
  