import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import WeatherBox from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

/*
로직 정리
1. 앱 실행 시 현재 위치 기반의 날씨정보가 보인다 V
2. 날씨정보: 도시명, 섭씨, 화씨, 흐림여부 V
3. 5개의 버튼이 있음(1개: 현위치, 나머지: 다른 도시) 
4. 도시버튼을 클릭 시 도시별 날씨가 나온다
5. 현 위치 버튼을 클릭 시 다시 현위치 기반의 날씨가 나온다
6. 버튼 클릭시 데이터를 들고오는 동안 로딩스피너를 표시한다
*/
const cities = ["Berlin", "Tokyo", "Ho chi minh", "Sydney"];

function App() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [apiError, setAPIError] = useState("");

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=613ad0d7a8f40c619ca323b29d8dcf57&units=metric`;
      let response = await fetch(url);
      let data = await response.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log(lat, lon);
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=613ad0d7a8f40c619ca323b29d8dcf57&units=metric`;
      let response = await fetch(url);
      let data = await response.json();

      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city === null) {
      setLoading(true);
      getCurrentLocation();
    } else {
      setLoading(true);
      getWeatherByCity();
    }
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity(null);
    } else {
      setCity(city);
    }
  };

  return (
    <>
      <Container className="vh-100">
        {loading ? (
          <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
            <ClipLoader color="#f88c6b" loading={loading} size={150} />
          </div>
        ) : !apiError ? (
          <div className="container">
            <WeatherBox weather={weather} />
            <WeatherButton
              cities={cities}
              handleCityChange={handleCityChange}
              setCity={city}
            />
          </div>
        ) : (
          apiError
        )}
      </Container>
    </>
  );
}

export default App;
