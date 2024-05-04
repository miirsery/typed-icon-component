import { Plugin } from 'vite'
const fs = require('fs')
const path = require('path')

import { GenerateTypesOptions } from './types'

/**
 * Обновляет имена файлов иконок и генерирует TypeScript типы для них.
 *
 * @param {GenerateTypesOptions} options - Параметры конфигурации для обновления имен файлов иконок.
 * @param {string} options.iconsPath - Путь к директории, содержащей SVG файлы иконок.
 * @param {string} [options.iconComponentPath] - Путь к директории, где должен быть сохранен сгенерированный файл TypeScript типов.
 * @param {string} [options.fileName='icon-names.types.ts'] - Имя сгенерированного файла TypeScript типов. По умолчанию 'icon-names.types.ts'.
 * @returns {void} - Функция не возвращает никакого значения.
 */
const updateFileNames = (options: GenerateTypesOptions): void => {
  const { iconsPath, iconComponentPath, fileName = 'icon-names.types.ts' } = options

  if (!fs.existsSync(iconComponentPath)) {
    fs.mkdirSync(iconComponentPath, { recursive: true })
  }

  const result = getSvgFileNames(iconsPath)
    .map((name) => `'${name}'`)
    .join(' | ')

  // prettier-ignore
  const resultType = result.length
    ? `export type IconNamesType = ${result}`
    : 'export type IconNamesType = \'\''

  const textType = `/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
${resultType}
`

  fs.writeFileSync(path.join(iconComponentPath, fileName), textType)
}

/**
 * Получает имена SVG файлов из указанного пути.
 *
 * @param {string} iconsPath - Путь к директории, содержащей SVG файлы иконок.
 * @returns {Array<string>} - Массив имен SVG файлов без расширения.
 */
const getSvgFileNames = (iconsPath: GenerateTypesOptions['iconsPath']): Array<string> => {
  const files = fs.readdirSync(iconsPath) as string[]

  const svgFiles = files.filter((file) => path.extname(file) === '.svg')

  return svgFiles.map((file) => path.parse(file).name)
}

/**
 * Генерирует TypeScript типы для имен иконок на основе SVG файлов, присутствующих в указанном пути к иконкам.
 * Этот плагин отслеживает изменения в пути к иконкам и обновляет TypeScript типы соответственно.
 *
 * @param {GenerateTypesOptions} options - Параметры конфигурации для генерации типов.
 * @param {string} options.iconsPath - Путь к директории, содержащей SVG файлы иконок.
 * @param {string} [options.iconComponentPath] - Путь к директории, где должен быть сохранен сгенерированный файл TypeScript типов.
 * @param {string} [options.fileName='icon-names.types.ts'] - Имя сгенерированного файла TypeScript типов. По умолчанию 'icon-names.types.ts'.
 * @returns {Plugin} - Объект плагина, который может быть использован в Vite.
 */
export const typedIconPlugin = (options: GenerateTypesOptions): Plugin => {
  const { iconsPath } = options

  updateFileNames(options)

  return {
    name: 'vite:typed-icon-names',
    configureServer() {
      fs.watch(iconsPath, () => {
        updateFileNames(options)
      })
    },
  }
}
