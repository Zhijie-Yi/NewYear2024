let startColor;
let endColor;
let gui;
let params = {
  strokeColor: '#ffffff', // 描边颜色为黑色
    startColor: '#ff3456', // 起始颜色
    endColor: '#ffffff', // 结束颜色
    backgroundColor: [245, 245, 245, 100], // 画布背景颜色，使用rgba数组
    segNum: 100, // 文本数量
    textSpacing: 10, // 文本间距
    fontSize: 70, // 文本大小
    text: "龍" // 文本内容
};

function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(params.fontSize);
    textFont('Microsoft YaHei');
    textStyle(BOLD);

    gui = new dat.GUI();
    gui.addColor(params, 'startColor').onChange(updateColors);
    gui.addColor(params, 'endColor').onChange(updateColors);
      gui.addColor(params, 'strokeColor');
    gui.addColor(params, 'backgroundColor');
    gui.add(params, 'segNum', 10, 200).step(1).onChange(() => setupArrays(params.segNum));
    gui.add(params, 'textSpacing', 1, 20);
    gui.add(params, 'fontSize', 10, 120);
    gui.add(params, 'text');

    updateColors();
    setupArrays(params.segNum);
}

function setupArrays(num) {
    x = new Array(num);
    y = new Array(num);
    for (let i = 0; i < num; i++) {
        x[i] = 0;
        y[i] = 0;
    }
}

function updateColors() {
    startColor = color(params.startColor);
    endColor = color(params.endColor);
}

function segment(x, y, a, i) {
    let currentColor = lerpColor(startColor, endColor, i / (params.segNum - 1));
    push();
    translate(x, y);
    rotate(a);
    fill(currentColor);
    stroke(params.strokeColor); // 使用params中的描边颜色
    strokeWeight(2);
    textSize(params.fontSize);
    text(params.text, 0, 0);
    pop();
}


function draw() {
    let bgColor = color(params.backgroundColor);
    background(bgColor);
    textAlign(CENTER, CENTER); // 设置文字对齐方式为居中
let message = "2024\nHAPPY\nCHINESE\nNEWYEAR!";
  textSize(46); // 设置文字大小
  fill(0); // 设置文字颜色为黑色
  text(message, width / 2, height / 2); // 在画布中心绘制文字
    let angle = atan2(mouseY - y[0], mouseX - x[0]);
    x[0] = mouseX - cos(angle) * params.textSpacing;
    y[0] = mouseY - sin(angle) * params.textSpacing;

    for (let i = 1; i < params.segNum; i++) {
        angle = atan2(y[i-1] - y[i], x[i-1] - x[i]);
        x[i] = x[i-1] - cos(angle) * params.textSpacing;
        y[i] = y[i-1] - sin(angle) * params.textSpacing;
    }

    for (let i = params.segNum - 1; i >= 0; i--) {
        segment(x[i], y[i], angle, i);
    }
}
