Create a mobile-first app called 'Mechatronix Toolkit' for mechatronics engineers and students. The app will feature a modular dashboard with the following core modules:
1.  **Kinematics & Dynamics Solver**: Forward/inverse kinematics for robotic arms (2–6 DOF) with 3D interactive preview, and trajectory planning (linear, circular, spline) with real-time graphs.
2.  **Control Systems Lab**: PID, lead-lag, state-space controller design with parameter tuning (sliders) and visualization (step response, bode plot, root locus). Export tuned coefficients.
3.  **Sensor & Signal Visualizer**: Real-time data streaming via Bluetooth/USB from common sensors (IMU, encoder, temperature), oscilloscope, FFT spectrum, and data logging.
4.  **Actuator Selector & Simulator**: Motor sizing (DC, stepper, servo) based on load/torque profiles, and simulation of PWM response and thermal limits.
5.  **Circuit Companion**: Quick-reference calculator for op-amp, filter, and H-bridge designs, and pinout diagrams for popular microcontrollers (Arduino, STM32, ESP32).

**Design & UX**: Dark theme with sharp accent colors (cyan/electric blue), minimalist, flat design, high-contrast typography, fast navigation, modular dashboard cards (everything accessible within two taps), smooth animations, and haptic feedback for sliders.

**Technical Requirements**: Offline-first capability (all calculations local), option to save/load projects and share reports as PDF, unit system toggle (SI / Imperial), professional splash screen with subtle gear-mesh animation.

The app should have a modular code structure, clean documentation, and be ready for iOS and Android deployment.