  import React from 'react';
  import { login } from '../components/Authentication/AuthService'; 
  import '../components/Styles/Login.css';

  const Login = () => {
    const handleLogin = () => {
      login();
    };

    return (
      <section>
        <h1>Spotify Hub</h1>
        <h2>Spotify Hub</h2>
        <button className="LoginButton" onClick={handleLogin}>Login with Spotify</button>
      <div class= "blob">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: 'rgb(19, 64, 50)', '--darkreader-inline-stopcolor': '#cecac3'}} data-darkreader-inline-stopcolor=""></stop>
            <stop offset="100%" style={{stopColor: 'rgb(147, 253, 112)', '--darkreader-inline-stopcolor': '#8dfd69'}} data-darkreader-inline-stopcolor=""></stop>
            </linearGradient>
          </defs>
          <path fill="url(#gradient)">
            <animate attributeName='d' dur="10000ms" repeatCount="indefinite"
            values='M453,281.5Q443,313,439,348.5Q435,384,412.5,413Q390,442,350,438Q310,434,280,442Q250,450,212.5,465.5Q175,481,146.5,456Q118,431,102,400Q86,369,67.5,342Q49,315,60.5,282.5Q72,250,55,215.5Q38,181,67,159.5Q96,138,107.5,104Q119,70,148.5,49.5Q178,29,214,44Q250,59,287,40.5Q324,22,341.5,60.5Q359,99,394.5,109Q430,119,454,147.5Q478,176,470.5,213Q463,250,453,281.5Z;
            M480.5,285Q464,320,444.5,348.5Q425,377,401.5,401.5Q378,426,343,427Q308,428,279,457.5Q250,487,220.5,459Q191,431,165,417Q139,403,121,380Q103,357,66,339.5Q29,322,17.5,286Q6,250,14,213Q22,176,58,156Q94,136,106.5,103Q119,70,147,44Q175,18,212.5,13.5Q250,9,279.5,38.5Q309,68,334,84.5Q359,101,390.5,113Q422,125,449.5,150.5Q477,176,487,213Q497,250,480.5,285Z;
            M466,288.5Q487,327,467,360Q447,393,418,417Q389,441,356.5,459.5Q324,478,287,462Q250,446,215.5,454.5Q181,463,154.5,440Q128,417,106,394Q84,371,63,344.5Q42,318,38,284Q34,250,25.5,212Q17,174,62.5,160.5Q108,147,119,115.5Q130,84,152,50Q174,16,212,38Q250,60,286.5,42Q323,24,354,44Q385,64,412,88.5Q439,113,463,143Q487,173,466,211.5Q445,250,466,288.5Z;
            M431.5918,280.15862Q435.90904,310.31724,431.02779,343.83857Q426.14655,377.35991,407.57327,409.70129Q389,442.04267,352.32931,446.98793Q315.65862,451.93318,282.82931,440.62521Q250,429.31724,221.75604,425.8265Q193.51207,422.33577,169.09742,408.19848Q144.68276,394.0612,100.78664,391.91465Q56.89051,389.76811,51.5306,352.84138Q46.17069,315.91465,46.86272,282.95733Q47.55474,250,33.32004,212.52134Q19.08535,175.04267,56.7653,156.32931Q94.44526,137.61595,110.65862,109.24396Q126.87198,80.87198,155.12802,63.55474Q183.38405,46.23751,216.69203,37.47866Q250,28.71982,280.24396,45.64935Q310.48793,62.57889,336.27456,79.45087Q362.0612,96.32285,396.88125,107.26811Q431.70129,118.21336,434.3265,153.94806Q436.95171,189.68276,432.11314,219.84138Q427.27456,250,431.5918,280.15862Z;
            M456.5,285.5Q469,321,458,357Q447,393,401,394Q355,395,337.5,430.5Q320,466,285,454.5Q250,443,216,452Q182,461,150.5,445.5Q119,430,89,409.5Q59,389,64,349Q69,309,71,279.5Q73,250,51,214Q29,178,45.5,146Q62,114,94.5,97.5Q127,81,157,69Q187,57,218.5,40.5Q250,24,281.5,39.5Q313,55,353,54Q393,53,417,82Q441,111,432,152.5Q423,194,433.5,222Q444,250,456.5,285.5Z;
            M453,281.5Q443,313,439,348.5Q435,384,412.5,413Q390,442,350,438Q310,434,280,442Q250,450,212.5,465.5Q175,481,146.5,456Q118,431,102,400Q86,369,67.5,342Q49,315,60.5,282.5Q72,250,55,215.5Q38,181,67,159.5Q96,138,107.5,104Q119,70,148.5,49.5Q178,29,214,44Q250,59,287,40.5Q324,22,341.5,60.5Q359,99,394.5,109Q430,119,454,147.5Q478,176,470.5,213Q463,250,453,281.5Z'
            ></animate>
          </path>
        </svg>
      </div>

      <div class= "blob1">
        <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink" width="100%" id="blobSvg">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: 'rgb(19, 64, 50)', '--darkreader-inline-stopcolor': '#cecac3'}} data-darkreader-inline-stopcolor=""></stop>
            <stop offset="100%" style={{stopColor: 'rgb(147, 253, 112)', '--darkreader-inline-stopcolor': '#8dfd69'}} data-darkreader-inline-stopcolor=""></stop>
            </linearGradient>
          </defs>
          <path fill="url(#gradient)">
            <animate attributeName='d' dur="10000ms" repeatCount="indefinite"
            values='M453,281.5Q443,313,439,348.5Q435,384,412.5,413Q390,442,350,438Q310,434,280,442Q250,450,212.5,465.5Q175,481,146.5,456Q118,431,102,400Q86,369,67.5,342Q49,315,60.5,282.5Q72,250,55,215.5Q38,181,67,159.5Q96,138,107.5,104Q119,70,148.5,49.5Q178,29,214,44Q250,59,287,40.5Q324,22,341.5,60.5Q359,99,394.5,109Q430,119,454,147.5Q478,176,470.5,213Q463,250,453,281.5Z;
            M480.5,285Q464,320,444.5,348.5Q425,377,401.5,401.5Q378,426,343,427Q308,428,279,457.5Q250,487,220.5,459Q191,431,165,417Q139,403,121,380Q103,357,66,339.5Q29,322,17.5,286Q6,250,14,213Q22,176,58,156Q94,136,106.5,103Q119,70,147,44Q175,18,212.5,13.5Q250,9,279.5,38.5Q309,68,334,84.5Q359,101,390.5,113Q422,125,449.5,150.5Q477,176,487,213Q497,250,480.5,285Z;
            M466,288.5Q487,327,467,360Q447,393,418,417Q389,441,356.5,459.5Q324,478,287,462Q250,446,215.5,454.5Q181,463,154.5,440Q128,417,106,394Q84,371,63,344.5Q42,318,38,284Q34,250,25.5,212Q17,174,62.5,160.5Q108,147,119,115.5Q130,84,152,50Q174,16,212,38Q250,60,286.5,42Q323,24,354,44Q385,64,412,88.5Q439,113,463,143Q487,173,466,211.5Q445,250,466,288.5Z;
            M431.5918,280.15862Q435.90904,310.31724,431.02779,343.83857Q426.14655,377.35991,407.57327,409.70129Q389,442.04267,352.32931,446.98793Q315.65862,451.93318,282.82931,440.62521Q250,429.31724,221.75604,425.8265Q193.51207,422.33577,169.09742,408.19848Q144.68276,394.0612,100.78664,391.91465Q56.89051,389.76811,51.5306,352.84138Q46.17069,315.91465,46.86272,282.95733Q47.55474,250,33.32004,212.52134Q19.08535,175.04267,56.7653,156.32931Q94.44526,137.61595,110.65862,109.24396Q126.87198,80.87198,155.12802,63.55474Q183.38405,46.23751,216.69203,37.47866Q250,28.71982,280.24396,45.64935Q310.48793,62.57889,336.27456,79.45087Q362.0612,96.32285,396.88125,107.26811Q431.70129,118.21336,434.3265,153.94806Q436.95171,189.68276,432.11314,219.84138Q427.27456,250,431.5918,280.15862Z;
            M456.5,285.5Q469,321,458,357Q447,393,401,394Q355,395,337.5,430.5Q320,466,285,454.5Q250,443,216,452Q182,461,150.5,445.5Q119,430,89,409.5Q59,389,64,349Q69,309,71,279.5Q73,250,51,214Q29,178,45.5,146Q62,114,94.5,97.5Q127,81,157,69Q187,57,218.5,40.5Q250,24,281.5,39.5Q313,55,353,54Q393,53,417,82Q441,111,432,152.5Q423,194,433.5,222Q444,250,456.5,285.5Z;
            M453,281.5Q443,313,439,348.5Q435,384,412.5,413Q390,442,350,438Q310,434,280,442Q250,450,212.5,465.5Q175,481,146.5,456Q118,431,102,400Q86,369,67.5,342Q49,315,60.5,282.5Q72,250,55,215.5Q38,181,67,159.5Q96,138,107.5,104Q119,70,148.5,49.5Q178,29,214,44Q250,59,287,40.5Q324,22,341.5,60.5Q359,99,394.5,109Q430,119,454,147.5Q478,176,470.5,213Q463,250,453,281.5Z'
            ></animate>
          </path>
        </svg>
      </div>
      </section>
    );
  };

  export default Login;
