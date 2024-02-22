# mobile-app

## Instrucciones

- Clonar este repositorio
- (macOS) Asegurarse de tener instalado [CocoaPods](https://cocoapods.org/)
  - `sudo gem install cocoapods`
- Ejecutar 'pod install' en carpeta ios

```
yarn install
```

- Arreglar algunas librerias del `node_modules` con un comando (leer mas sobre esto en startupScripts/readme.md)
  si sale error de ('Firebase.h' file not found with <angled> include; use "quotes" instead) o React/Core | React-Core

```
yarn fix
```

- (macOS) Desde la raíz del proyecto ir a la carpeta `ios` desde la Terminal y ejecutar `pod install`.

Una vez ejecutados estos pasos ya se debería poder probar el proyecto con `yarn ios` desde el emulador o `yarn android` desde el emulador de Android o en un dispositivo Android conectado a la computadora con configuración de desarrollo activada (tiene que estar visible al ejecutar `adb devices`). Para probar en un dispositivo iOS:

- Abrir el archivo `powermind.xcworkspace` que se encuentra en la carpeta `ios` del proyecto.
- Conectar el dispositivo iOS en el cual se quiere probar.
- Elegir el dispositivo en la lista de dispositivos de Xcode.
- Ejecutar.

---

- Generar nuevo archivo de entorno

```
  cp env.example.json env.json
```

[BROWSE NATIVE BASE ICONS](https://oblador.github.io/react-native-vector-icons/)