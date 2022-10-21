# Crie Seu Próprio Web Component

Explore os conceitos de Web Components, criando seu próprio componente em JavaScript.

No artigo de hoje resolvi sintetizar alguns dos conceitos que estou estudando na Formação Angular aqui na DIO com o instrutor Felipe Aguiar, que são os Web Components no Front-end. Ter essa base é essencial para entendermos o que acontece "por baixo dos panos" quando trabalhamos com componentes.

### Resumo

&#x20;Os Web Components consistem em elementos customizados, reutilizáveis e independentes, compostos por um conjunto de tecnologias que são agrupadas numa tag HTML personalizada. Sob esse aspecto, a adoção de componentes traz como vantagens a redução da repetição de códigos,  facilidade de manutenção e escalabilidade, além melhorar a performance. Nesse sentido, o presente artigo trata acerca do tema de maneira teórica e prática através da criação de um componente.

**Palavras-chave:** Web Componentes, JavaScript, Shadow DOM.

#### Você vai terminar este artigo sabendo:

* O que é um Web Component?
* Como Identificar um Componente?
* Passos para Criar um Componente
* Considerações Finais
* Referências e Links Utilitários

### O que é um Web Component?

É um conjunto de tecnologias que possibilita criar elementos customizáveis independentes que podem ser reutilizados na aplicação web. Dentre as tecnologias que compõem um Web Componente, temos:

**Custom elements:** Possibilita a criação de elementos personalizados e definição do seu comportamento;

**Shadow DOM:** Árvore "fantasma" anexada ao DOM (Document Object Model), renderizada separadamente;

**HTML templates:** Modelo HTML, "fragmentos" de marcação que podem ser instanciados posterior ao carregamento da página.

&#x20; Na imagem a seguir, podemos observar que dentro do **Custom Element** "app-card" temos uma subárvore #shadow-root que contém a estrutura HTM do componente e a tag style que agrupa a estilização.

Figura 01 – Inspetor do componente de um card no navegador Firefox.

<figure><img src="../.gitbook/assets/figura-01-estrutura-component.jpg" alt=""><figcaption></figcaption></figure>

Fonte: Elaborado pelo autor.

### Como Identificar um Componente?

&#x20;Meu primeiro contato prático com Componentes foi em Arquitetura (civil), sobretudo em modelagem 3D, e ao me deparar com esse conceito em Desenvolvimento Web percebi que é basicamente a mesma coisa, então para simplificar vou trazer esse exemplo mais "real":

&#x20;Vamos simular uma maquete eletrônica de edifício residencial com vários apartamentos. Imagine que precisamos modelar as portas de cada um desses apartamentos. Você concorda que seria bem mais fácil criar um único modelo de porta e apenas repeti-lo do que ter que modelar uma por uma? Ao construir esse modelo você está criando um componente! Assim, caso a gente precise alterar o modelo da porta de um apartamento isso irá se repetir automaticamente em todas as portas baseadas neste modelo. Com isso, não teremos o retrabalho de modelar a alteração cada vez que essa porta se repetir, podendo acabar inclusive cometendo o erro de esquecer alguma.

Trazendo para o contexto Web, você já deve ter observado ao visitar alguma página que um conjunto de elementos se repetem numa determinada estrutura. Como por exemplo, um cabeçalho contendo uma logo, menu e um botão. Mas um componente não precisa necessariamente estar presente em todas as páginas, basta que tenha a necessidade de reutilizá-lo. Podemos observar, por exemplo, na aba de artigos da Digital Innovation One, sempre que você abre um artigo, seja ele qual for, a estrutura abaixo pode ser visualizada:

Figura 02 – Interface da página de leitura de artigos da DIO.

<figure><img src="../.gitbook/assets/figura-02-pagina-artigos-dio.jpg" alt=""><figcaption></figcaption></figure>

Fonte: Digital Innovation One. Elaborado pelo autor.

Além do **cabeçalho**, que se repete em toda a plataforma, podemos observar outros componentes que são comuns a essa área de artigos (Figura 02). Logo abaixo, na direita, temos uma **área para votação** com dois botões e um contador. E em seguida, um **menu de compartilhamento**. Sob esse aspecto, o menu de compartilhamento não depende que a área para votação faça parte dele para que exerça a sua função. Ao contrário do botão do LinkedIn por exemplo, já que o objetivo deste componente é ter um conjunto de elementos que possibilitem compartilhar o conteúdo. Com isso, é coerente que a área de votos e o menu estejam próximos, mas não significa que um dependa do outro para fazer sentido isoladamente.

Figura 03 – Identificando Componentes na página de leitura de artigos da DIO.

<figure><img src="../.gitbook/assets/figura-03-dio-artigos-componentes.gif" alt=""><figcaption></figcaption></figure>

Fonte: Digital Innovation One. Elaborado pelo autor.

Além disso, os próprios botões presentes no componente do menu, podem ser baseados no componente botão, por exemplo, contendo características que estão presentes em todos os botões (um círculo com um ícone branco centralizado).

&#x20;E é com essa mentalidade que podemos ir identificando outros componentes e momento de utilizá-los. Fazendo isso se reduz a repetição de código, e otimiza o trabalho do desenvolvedor, pois facilita a manutenção possibilitando a alteração automática do modelo de todas as "réplicas" de um mesmo componente, além de melhorar a performance e escalabilidade.

### Passos para Criar um Componente

Como ambiente de desenvolvimento, podemos utilizar o Visual Studio Code e visualizá-lo no navegador, ou editar e visualizar direto no [CodePen](https://codepen.io/).

Caso queira utilizar o Visual Studio Code, crie um arquivo .html e outro .js. No arquivo HTML escreva o comando **html:5** para que ele monte automaticamente a estrutura, e dentro da tag body insira a tag script apontando para o arquivo JavaScript que você criou (Figura 03).

Figura 04 – Arquivo index.html no Visual Studio Code&#x20;

<figure><img src="../.gitbook/assets/figura-04-vs-code.JPG" alt=""><figcaption></figcaption></figure>

Fonte: Visual Studio Code. Elaborado pelo autor.

&#x20;Já no CodePen, basta acessar < [https://codepen.io/](https://codepen.io/) > e criar uma conta (caso deseje salvar o seu código), ou ir direto para o editor acessando o link: < [https://codepen.io/pen](https://codepen.io/pen) >.

Com o editor de código aberto, você vai visualizar uma interface similar a da imagem abaixo:

Figura 05 – Editor de código (Pen) CodePen.

<figure><img src="../.gitbook/assets/figura-05-codepen.jpg" alt=""><figcaption></figcaption></figure>

Fonte: CodePen. Elaborado pelo autor.

Para mudar a forma de visualização, basta clicar no botão no menu superior ao lado de "Settings" como mostrado na Figura 04. Além disso, você também pode minimizar a aba CSS, clicando no segundo ícone e em seguida "Minimize CSS Editor", já que vamos utilizar apenas a de HTML e JavaScript.

Ambiente pronto, agora vamos codar!

#### 01. Crie uma Classe derivada de HTMLElement&#x20;

&#x20;Trazendo alguns breves conceitos sobre Programação Orientada a Objetos (POO), uma **classe** é um modelo que abstrai um conjunto de objetos com características em comum. Por exemplo, numa classe cadeira, temos como derivadas as cadeiras de jantar e escolar. Embora uma cadeira de jantar não possua braço como uma escolar, ambas possuem encosto e assento (características similares que serão **herdadas** da sua classe base/pai cadeira)

Voltando para o nosso componente Card, vamos criar uma classe e chamá-la de CardComponent. Você pode nomear da forma que preferir, desde que seja coerente e mantenha o padrão **Pascal Case**, que consiste em escrever a primeira letra das palavras em maiúsculo.

```javascript
class CardComponent extends HTMLElement {}
```

Vamos dizer também que a classe que criamos "**extends**" de HTMLElement, o que significa que desejamos que ela seja derivada/filha da **superclasse** (classe base/pai) **** HTMLElement, e com isso herde os métodos e características dessa interface que representa qualquer elemento HTML.

Em seguida, vamos inserir o método constructor(), e dentro dele vamos adicionar a keyword super() que faz a chamada do constructor de onde a classe estende (nesse caso HTMLElement).

```javascript
class CardComponent extends HTMLElement {
  constructor() {
        super();
  }
}
```

#### 02. Crie uma constante e atribua uma árvore Shadow DOM anexada a Classe

&#x20;Ainda dentro do constructor da nossa classe, vamos criar a constante shadowRoot e atribuir "this" (que traz a referência de contexto) e o método .attachShadow() que anexa uma árvore Shadow DOM ao elemento especificado, neste caso a nossa classe.

&#x20; O .attachShadow() receberá como parâmetro o objeto options, e dentro dele o campo **mode**, que pode receber:

&#x20;"**open**" -> caso queira que seja acessado pelo JavaScript fora do nosso componente;

"**closed**" -> se deseja que seja acessado apenas pelo JavaScript interno.&#x20;

<pre class="language-javascript"><code class="lang-javascript"><strong>class CardComponent extends HTMLElement {
</strong>  constructor() {
        super();
        const shadow = this.attachShadow({mode: "open"});
  }
}</code></pre>

#### 03. Defina o Custom Element

&#x20;Com o customElements chamamos o método .define() para definir nosso elemento customizado. Ele recebe como primeiro parâmetro o seletor, que é o nome da nossa tag HTML, que deverá ser separado por hífen (para diferenciar das tags padrão que contém uma letra/palavra, por exemplo "p" ou "title"). Em seguida, passamos o construtor, nesse caso a classe CardComponent que contém o constructor do nosso elemento.

```javascript
class CardComponent extends HTMLElement {
  constructor() {
        super();
        const shadow = this.attachShadow({mode: "open"});
  }
}

customElements.define('card-component', CardComponent)
```

A partir disso já podemos ter uma prévia do nosso componente chamando nosso seletor `<card-component></card-component>` no HTML, e chamando a nossa constante shadow com a propriedade **`.innerHTML`** para retornar a string "Hello World!", conforme no exemplo abaixo:

```javascript
class CardComponent extends HTMLElement {
  constructor() {
        super();
        const shadow = this.attachShadow({mode: "open"});
        shadow.innerHTML = "Hello World!";
  }
}

customElements.define('card-component', CardComponent)
```

Figura 06 – Editor de código e visualização do componente no CodePen

<figure><img src="../.gitbook/assets/figura-06-exemplo" alt=""><figcaption></figcaption></figure>

Fonte: CodePen. Elaborado pelo autor.

&#x20;Com essa base, podemos ir desenvolvendo nosso componente de maneira mais rebuscada a partir dos próximos passos.

#### 04. Insira métodos para construção e estilização do componente

Para construir e estilizar o nosso componente vamos inserir dois métodos, um para construirmos a estrutura do nosso componente (**`.build()`**)  e outro para estilizá-lo (**`.styles()`**).

E vamos criar um nó na árvore shadow DOM do componente com o método .appendChild() dentro do constructor, onde shadow representa o elemento pai e o this.build() / this.styles() o filho (nó a ser criado).

```javascript
class CardComponent extends HTMLElement {

  constructor() {
        super();
    
        const shadow = this.attachShadow({mode: "open"});
        shadow.appendChild(this.build());
        shadow.appendChild(this.styles());
  }
  
  build(){}
  
  styles(){}
 
}

customElements.define('card-component', CardComponent)
```

&#x20;Antes de codificar, vamos pensar na estrutura do nosso componente para termos em mente quais elementos vão compor ele. Para facilita a compreensão através da escrita, será feita uma estrutura bem simples, apenas com imagem e título, mas você pode conferir o exercício que resolvi do curso aqui.&#x20;

Figura 07 – Estrutura do componente Card.

<figure><img src="../.gitbook/assets/figura-estrutura-html-card.jpg" alt=""><figcaption></figcaption></figure>

Fonte: Elaborado pelo autor.

&#x20;Com isso, dentro do .build() vamos declarar a constante componentRoot

```javascript
class CardComponent extends HTMLElement {

  constructor() {
        super();
    
        const shadow = this.attachShadow({mode: "open"});
        shadow.appendChild(this.build());
        shadow.appendChild(this.styles());
  }
  
  build(){
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "card");
  }
  
  styles(){}
 
}

customElements.define('card-component', CardComponent)
```

E no HTML, vamos preencher com o texto

```html
<card-component                                             
      cover="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt4e5af408cc7a87b5/5eb7cdc17bedc8627eff8deb/V_AGENTS_587x900_Omen.png"
      title="Uma Lembrança Fantasmagórica"
      description="O Omen caça nas sombras e com sua paranoia cega os adversários assumindo o controle."
>
</card-component>
```

<figure><img src="../.gitbook/assets/figura-html-cards.jpg" alt=""><figcaption></figcaption></figure>

Fonte: CodePen. Elaborado pelo autor.

### Considerações finais

&#x20;Neste artigo aprendemos que componentes são do que um conjunto de elementos encapsulados numa tag html que podem ser reutilizados. Sob esse aspecto, foi possível acompanhar passos para criar um componente em JavaScript. Caso queira ver mais recomendo o curso **Web Components no Front-end**, e as referências MDN Web Docs, além de outros que você pode conferir no tópico Referências e Links Utilitários.

&#x20;Por fim, vale salientar que é interessante ter essa base para compreender como funciona os Web Components, mas hoje temos frameworks e bibliotecas que nos possibilita criar componentes de forma mais prática.

### Referências e Links Utilitários

MDN Web Docs. **Classes**. Disponível em: <[  ](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes)[https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes) >.

MDN Web Docs. **CustomElementRegistry.define()**. Disponível em: < [https://developer.mozilla.org/pt-BR/docs/Web/API/CustomElementRegistry/define](https://developer.mozilla.org/pt-BR/docs/Web/API/CustomElementRegistry/define) >;

MDN Web Docs. **Element.attachShadow()**. Disponível em: < [https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow) >.

MDN Web Docs. **Web Components**. Disponível em: < [https://developer.mozilla.org/pt-BR/docs/Web/Web\_Components](https://developer.mozilla.org/pt-BR/docs/Web/Web\_Components) >.

WEB COMPONENTS. **Introduction**. Disponível em: < [https://www.webcomponents.org/introduction](https://www.webcomponents.org/introduction) >.

#### Cursos sobre o tema na Digital Innovation One:

**Trabalhando com Web Components no Front-end**. Formação Angular. Instrutor: Felipe Aguiar.

**A arquitetura de componentes e a gestão da complexidade no front-end**. Instrutora: Geovana Ribeiro.

**Programação Orientada a Objetos**. Instrutor: Thiago Leite.

### Este artigo foi útil para você?

Dê um upvote e me conta nos comentários o que você achou 😊💜\
[\
![Artigos](https://camo.githubusercontent.com/3c8a0003fa34ff80151fdfa78c1855bbfaa52c1cd4f95cbc76ef247110a3fbc0/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f56656a612532306d6575732532306f7574726f7325323041727469676f732d3030303f7374796c653d666f722d7468652d6261646765)](https://elidianaandrade.github.io/articles) [![LinkedIn](https://camo.githubusercontent.com/f66fe25e822884bedd0c55acee60415a4feeb4cce985f4461f9af20a4dea2112/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4c696e6b6564496e2d3030303f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d36363130463226636f6c6f723a464646)](https://www.linkedin.com/in/elidianaandrade/) [![Github](https://camo.githubusercontent.com/cf38d1c8dc4e8ed0a3e0a79c6b7172ab70ea2a563d0287f914bef3368b6396f9/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769746875622d3030303f7374796c653d666f722d7468652d6261646765266c6f676f3d676974687562266c6f676f436f6c6f723d363631304632)](https://github.com/elidianaandrade)
