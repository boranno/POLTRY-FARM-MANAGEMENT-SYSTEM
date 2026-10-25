# Poultry Farm Management System (PFMS)

**Version:** v3.0

**Author:** Boranno Golder

**Board:** ESP32 S3 WROOM

**Date:** 25 OCT 2026

[https://boranno.github.io/POLTRY-FARM-MANAGEMENT-SYSTEM/](https://boranno.github.io/POLTRY-FARM-MANAGEMENT-SYSTEM/)

## Project overview

PFMS monitors temperature, humidity, and ammonia levels inside a poultry house and uses a TinyML model to classify the farm condition as Optimal, Suboptimal, or Dangerous. The ESP32 board controls the farm actuators automatically and uploads live data to Firebase so the dashboard can show the latest readings in real time.

This project is structured to be easy to clone, customize, and contribute to as a GitHub repository.

## Features

- DHT22 temperature and humidity monitoring
- MQ-135 ammonia sensing
- TinyML-based farm condition prediction
- Firebase Realtime Database integration
- Local LCD display output
- Automatic control for fan, heater, ventilation, and siren
- WiFi reconnection and Firebase retry handling
- Offline-safe control logic when live updates are disabled
- GitHub Pages dashboard for monitoring remotely

## Repository contents

- PFMS/ - Arduino firmware for the ESP32
- Model/poultry_model_int8.h - intended location for the embedded int8 TinyML model
- index.html, style.css, script.js - web dashboard
- firebase-config.js - Firebase configuration for the frontend
- diagram.json - Wokwi simulation wiring diagram
- libraries.txt - Arduino library references
- LICENSE - MIT license

## Hardware overview

| Component | Pin |
|---|---|
| DHT22 data pin | 5 |
| MQ-135 analog output | 6 |
| Live update switch | 12 |
| Red LED | 38 |
| Yellow LED | 39 |
| Blue LED | 40 |
| Firebase upload active LED | 10 |
| Firebase upload stopped LED | 11 |
| Fan relay | 16 |
| Heater relay | 17 |
| Ventilation relay | 18 |
| Siren relay | 7 |

## Farm thresholds

| Parameter | Optimal | Suboptimal | Dangerous |
|---|---|---|---|
| Temperature | 20–30°C | 15–20°C or 30–35°C | <15°C or >35°C |
| Humidity | 50–70% | 30–50% or 70–80% | <30% or >80% |
| Ammonia | <10 ppm | 10–25 ppm | >25 ppm |

## TinyML model

- **Model file:** `Model/poultry_model_int8.h`
- **Format:** TensorFlow Lite for Microcontrollers, int8 quantized
- **Input features:** temperature, humidity, and ammonia, in that order
- **Preprocessing:** raw sensor values; the firmware currently uses a mean of 0 and scale of 1 for each feature
- **Output classes:** index 0 = Dangerous, index 1 = Optimal, index 2 = Suboptimal
- **Tensor arena:** 20 KB allocated by the firmware

The model header in this repository is currently empty. Add the exported model byte array before building the firmware; the README does not include model training details or performance metrics because those are not present in the repository.

## Firebase data format

The firmware writes live data to:

- /pfms/current
- /pfms/history
- /pfms/actuators

Example current payload:

```json
{
  "temperature": 27.1,
  "humidity": 62.5,
  "ammonia": 8.4,
  "state": "Optimal",
  "timestamp": { ".sv": "timestamp" }
}
```

## Project setup

### Prerequisites

- Visual Studio Code with the PlatformIO IDE extension
- PlatformIO ESP32 platform and board configuration for the ESP32-S3 WROOM
- Internet access for Firebase and WiFi

### Required libraries

- DHT sensor library
- LiquidCrystal I2C
- FirebaseClient
- WiFi
- WiFiClientSecure
- TensorFlow Lite for Microcontrollers

### Configure credentials

Edit the values in the firmware before upload:

```cpp
#define FIREBASE_API_KEY      "your api key"
#define FIREBASE_DATABASE_URL "your database url"

#define WIFI_SSID     "your wifi ssid"
#define WIFI_PASSWORD "your wifi password"
```

## Build and upload

1. Open the firmware project in Visual Studio Code with the PlatformIO IDE extension installed.
2. Configure PlatformIO for the ESP32-S3 WROOM board and install the required libraries.
3. Add the exported TinyML model byte array to `Model/poultry_model_int8.h`.
4. Update Firebase and WiFi credentials in the firmware.
5. Build and upload the firmware using PlatformIO.
6. Turn on the live update switch when you want cloud uploads.

## Website deployment

This repository includes a front-end dashboard intended to be served as a static GitHub Pages site. The current live site is:

https://boranno.github.io/POLTRY-FARM-MANAGEMENT-SYSTEM/

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Commit and push the branch.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Notes

- The current firmware uses Firebase and TinyML rather than the older Blynk design.
- The dashboard expects the Firebase payload format produced by the ESP32 firmware.
- The Wokwi simulation is available through the included diagram.json and wokwi-project.txt files.
