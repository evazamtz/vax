---
layout: default
---

Text can be **bold**, _italic_, or ~~strikethrough~~.

[Link to another page](another-page).

There should be whitespace between paragraphs.

There should be whitespace between paragraphs. We recommend including a README, or a file with information about your project.

# [](#header-1)Header 1

This is a normal paragraph following a header. GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.

## [](#header-2)Header 2

> This is a blockquote following a header.
>
> When something is important enough, you do it even if the odds are not in your favor.

### [](#header-3)Header 3

```yaml
colors:
  core: "0-#aaf-#9be:50-#225"
  ops:  "0-#495-#075:20-#335"
  bool: "0-#0ff-#0dd:20-#111"

groups:
  core: Основные элементы
  ops: Арифметические операции
  bool: Логические операции
  str: Строковые операции

types:
  # Any type is considered as super type
  Numeric:
    color: "#fff"
    title: Число
  Boolean:
    color: "#ff0"
    title: Условие
  String:
    color: "#0ff"
    title: Строка


components:
  Result:
    color: "0-#f80-#da0:50-#520"
    group: core
    title: Результат
    in:
      I: Any

  Repeat:
    color: @core
    group: core
    title: =>>=
    typeParams: [T]
    in:
      I: @T
    out:
      O: @T

  Number:
    title: Число
    color: @core
    group: core
    attrs:
      V:
        title: =
        type: Numeric
        default: "0"
    out:
      O: Numeric

  String:
    color: @core
    group: core
    title: Строка
    attrs:
      V:
        title: =
        type: String
        default: "-"
    out:
      O: String

  ToString:
    color: @core
    group: str
    title: Преобразовать в строку
    in:
      I: Any
    out:
      O: String

  Concat:
    color: @core
    group: str
    title: Склеить строки
    in:
      S1: String
      S2: String
      S3: String
      S4: String
    out:
      O: String

  Prompt:
    title: Числовой параметр
    color: @core
    group: core
    attrs:
      Name:
        title: Название
        type: Any
        default: "a"
    out:
      O: Numeric

  Add:
    group: ops
    color: @ops
    title: "+"
    in:
      A: Numeric
      B: Numeric
    out:
      O: Numeric

  Sub:
    title: "-"
    group: ops
    color: @ops
    in:
      A: Numeric
      B: Numeric
    out:
      O: Numeric

  Mul:
    title: "*"
    group: ops
    color: @ops
    in:
      A: Numeric
      B: Numeric
    out:
      O: Numeric

  Div:
    title: "/"
    group: ops
    color: @ops
    in:
      A: Numeric
      B: Numeric
    out:
      O: Numeric

  Sqrt:
    title: Корень
    group: ops
    color: @ops
    in:
      I: Numeric
    out:
      O: Numeric

  If:
    title: "Если То Иначе"
    color: @bool
    group: bool
    typeParams: [T]
    in:
      Condition: Boolean
      onTrue: @T
      onFalse: @T
    out:
      O:
        type: "@T"

  Gt:
    title: "Больше (>)"
    color: @bool
    group: bool
    in:
      A: Numeric
      B: Numeric
    out:
      O: Boolean

  Eq:
    title: "Равняется"
    color: @bool
    group: bool
    in:
      A: Numeric
      B: Numeric
    out:
      O: Boolean

  Not:
    title: "НЕ"
    color: @bool
    group: bool
    in:
      I: Boolean
    out:
      O: Boolean

  And:
    title: "И"
    color: @bool
    group: bool
    in:
      A: Boolean
      B: Boolean
    out:
      O: Boolean

  Or:
    title: "ИЛИ"
    color: @bool
    group: bool
    in:
      A: Boolean
      B: Boolean
    out:
      O: Boolean
```

```ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

#### [](#header-4)Header 4

*   This is an unordered list following a header.
*   This is an unordered list following a header.
*   This is an unordered list following a header.

##### [](#header-5)Header 5

1.  This is an ordered list following a header.
2.  This is an ordered list following a header.
3.  This is an ordered list following a header.

###### [](#header-6)Header 6

| head1        | head two          | three |
|:-------------|:------------------|:------|
| ok           | good swedish fish | nice  |
| out of stock | good and plenty   | nice  |
| ok           | good `oreos`      | hmm   |
| ok           | good `zoute` drop | yumm  |

### There's a horizontal rule below this.

* * *

### Here is an unordered list:

*   Item foo
*   Item bar
*   Item baz
*   Item zip

### And an ordered list:

1.  Item one
1.  Item two
1.  Item three
1.  Item four

### And a nested list:

- level 1 item
  - level 2 item
  - level 2 item
    - level 3 item
    - level 3 item
- level 1 item
  - level 2 item
  - level 2 item
  - level 2 item
- level 1 item
  - level 2 item
  - level 2 item
- level 1 item

### Small image

![](https://assets-cdn.github.com/images/icons/emoji/octocat.png)

### Large image

![](https://guides.github.com/activities/hello-world/branching.png)


### Definition lists can be used with HTML syntax.

<dl>
<dt>Name</dt>
<dd>Godzilla</dd>
<dt>Born</dt>
<dd>1952</dd>
<dt>Birthplace</dt>
<dd>Japan</dd>
<dt>Color</dt>
<dd>Green</dd>
</dl>

```
Long, single-line code blocks should not wrap. They should horizontally scroll if they are too long. This line should be long enough to demonstrate this.
```

```
The final element.
```
