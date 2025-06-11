# Proyecto React Native con Expo 📱

Este es un proyecto de introducción para aprender React Native con [Expo](https://expo.dev). El proyecto incluye un formulario básico para crear estudiantes y está diseñado para enseñar los conceptos fundamentales de desarrollo móvil.

## Requisitos previos

- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI (se instalará automáticamente)

## Instalación y configuración

1. **Clona o descarga este repositorio**

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**

   ```bash
   npx expo start
   ```

## Opciones para ejecutar la aplicación

Una vez que ejecutes `npx expo start`, verás un código QR y varias opciones:

### Opción 1: Expo Go (Recomendado para principiantes)
- Descarga la app **Expo Go** desde:
  - [App Store (iOS)](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent)
- Escanea el código QR con la cámara de tu teléfono (iOS) o con la app Expo Go (Android)

### Opción 2: Simuladores
- **iOS Simulator**: Presiona `i` en la terminal (requiere macOS y Xcode)
- **Android Emulator**: Presiona `a` en la terminal (requiere Android Studio)

### Opción 3: Navegador web
- Presiona `w` en la terminal para abrir en el navegador

## Estructura del proyecto

```
proyecto-react-native/
├── app/
│   └── (tabs)/
│       └── index.tsx          # Pantalla principal con formulario
├── components/                # Componentes reutilizables
├── assets/                   # Imágenes y fuentes
├── constants/                # Constantes de la aplicación
└── hooks/                    # Hooks personalizados
```

## Características del proyecto

- ✅ Formulario completo para crear estudiantes
- ✅ Validación de campos
- ✅ Interfaz responsive
- ✅ Navegación por pestañas
- ✅ Componentes reutilizables
- ✅ TypeScript para mayor seguridad

## Conceptos que aprenderás

- **Componentes básicos**: View, Text, TextInput, TouchableOpacity
- **Estado y hooks**: useState para manejar datos del formulario
- **Estilos**: StyleSheet y diseño responsive
- **Navegación**: Sistema de pestañas con Expo Router
- **Formularios**: Manejo de inputs y validación
- **TypeScript**: Tipado estático en React Native

## Comandos útiles

```bash
# Iniciar el proyecto
npx expo start

# Limpiar caché
npx expo start --clear

# Instalar nuevas dependencias
npm install [nombre-del-paquete]

# Generar build para producción
npx expo build
```

## Recursos adicionales

- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de React Native](https://reactnative.dev/)
- [Tutorial de Expo](https://docs.expo.dev/tutorial/introduction/)
- [Componentes de React Native](https://reactnative.dev/docs/components-and-apis)

## Problemas comunes

### El código QR no funciona
- Asegúrate de que tu teléfono y computadora estén en la misma red WiFi
- Intenta reiniciar el servidor con `npx expo start --clear`

### Error de dependencias
- Elimina `node_modules` y ejecuta `npm install` nuevamente
- Verifica que tengas Node.js actualizado

### Problemas con simuladores
- **iOS**: Asegúrate de tener Xcode instalado y actualizado
- **Android**: Verifica que Android Studio esté configurado correctamente

## Próximos pasos

Una vez que domines este proyecto básico, puedes explorar:

- Navegación entre pantallas
- Integración con APIs
- Almacenamiento local
- Notificaciones push
- Publicación en las tiendas de aplicaciones

¡Feliz aprendizaje! 🚀
