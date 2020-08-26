## Math Renderer - микросервис рендеринга TeX

![npm (scoped)](https://img.shields.io/npm/v/@yandex/tex-renderer)
![node-current](https://img.shields.io/node/v/@yandex/tex-renderer)
![Node.js CI](https://github.com/yandex/tex-renderer/workflows/Node.js%20CI/badge.svg)
[![Test Coverage](https://api.codeclimate.com/v1/badges/27f8b6d5e693e5edd62c/test_coverage)](https://codeclimate.com/github/yandex/tex-renderer/test_coverage)

### Возможности
- отдает картинку по переданной TeX формуле
- поддерживаемые форматы: `png` и `svg`
- масштабирование изображения
- оптимизация результата с помощью `svgo` и `pngquant`

### Описание API
GET `/process` - рендерит и возращает картинку:
- `tex` - TeX который необходимо отрендерить, (не забудьте заэкндить строку)
- `[format=^svg|png]` - формат изображения, по умолчанию svg. Принимает как массив, так и параметр в виде строки.
- `[ex_size=7.265625]` - размер одного ex в пикселях, влияет на размер получаемого изображения
- `inline` - булевый параметр, определяющий как отрисовывать формулу - `inline-TeX` или `TeX`. `inline-TeX` предназначен для тех случаев, когда формула встраивается в текстовое содержимое.

В случае если был передан один формат данных возвращается файл соответствующего типа.
Если было переданно несколько форматов, то возвращается `json` следующего вида:
```json
{
  '<format>': '<data>'
}
```

В случае ошибки:
```json
{
  "error": "Error string"
}
```

### Примеры

#### Формула
`\\sqrt{\\frac{5}{3x - 58}} = \\frac{1}{10} \\Rightarrow \\frac{5}{3x - 58} = \\left( \\frac{1}{10} \\right)^{2} \\Rightarrow \\frac{5}{3x - 58} = \\frac{1}{100} \\Rightarrow 3x - 58 = 500 \\Rightarrow 3x = 558 \\Rightarrow x = 186`

#### Результат (png):
![TeX формула в формате PNG](./examples/prof_math.png)

#### Формула
`E=mc^{2}`

#### Результат (svg):
![TeX формула в формате PNG](./examples/basic_math.svg)
