let bigIdeas = [
  { number: 1, label: "Creative Development", acronym: "CRD", weight: 12, color: "#e88cad" },
  { number: 2, label: "Data", acronym: "DAT", weight: 20, color: "#21c5cc" },
  { number: 3, label: "Algorithms & Programming", acronym: "AAP", weight: 35, color: "#d5ea36" },
  { number: 4, label: "Systems & Networks", acronym: "CSN", weight: 13, color: "#f5e85a" },
  { number: 5, label: "Impact of Computing", acronym: "IOC", weight: 25, color: "#f9b325" },
];

let students = [
  { name: "Alice", CRD: 4, DAT: 5, AAP: 3, CSN: 4, IOC: 5 },
  { name: "Jorge", CRD: 2, DAT: 3, AAP: 4, CSN: 3, IOC: 2 },
  { name: "Charlie", CRD: 5, DAT: 4, AAP: 5, CSN: 5, IOC: 4 },
  { name: "Javon", CRD: 3, DAT: 2, AAP: 2, CSN: 4, IOC: 3 },
  { name: "Eli", CRD: 1, DAT: 2, AAP: 3, CSN: 1, IOC: 2 },
];

let practices = [
  { number: 1, label: "Computational Solution Design", color: "#c3407e" },
  { number: 2, label: "Algorithms and Program Development", color: "#4f81bd" },
  { number: 3, label: "Abstraction in Program Development", color: "#de6e43" },
  { number: 4, label: "Code Analysis", color: "#f7c242" },
  { number: 5, label: "Computing Innovations", color: "#35c6b1" },
  { number: 6, label: "Responsible Computing", color: "#f7941e" },
];

let practiceSkills = {
  1: ["1.A Investigate the situation, context, or task.", "1.B Determine and design an appropriate method or approach.", "1.C Explain how collaboration affects development of a solution.", "1.D Evaluate solution options."],
  2: ["2.A Represent algorithmic processes without code.", "2.B Implement and apply an algorithm."],
  3: ["3.A Generalize data sources through variables.", "3.B Use abstraction to manage complexity.", "3.C Explain how abstraction manages complexity."],
  4: ["4.A Explain how a code segment functions.", "4.B Determine the result of code segments.", "4.C Identify and correct errors in algorithms and programs."],
  5: ["5.A Explain how computing systems work.", "5.B Explain how knowledge is generated from data.", "5.C Describe impact of a computing innovation.", "5.D Describe the impact of gathering data.", "5.E Evaluate computing using legal and ethical factors."],
  6: ["6.A Collaborate in the development of solutions.", "6.B Use safe and secure methods.", "6.C Acknowledge intellectual property."],
};

let bigIdeaDescriptions = {
  1: "BIG IDEA 1: CREATIVE DEVELOPMENT (CRD)\nWhen developing computing innovations, developers can use a formal,\niterative design process or a less rigid process of experimentation. While\nusing either approach, developers will encounter phases of investigating\nand reflecting, designing, prototyping, and testing. Additionally,\ncollaboration is an important tool at any phase of development, because\nconsidering multiple perspectives allows for improvement of innovations.",
  2: "BIG IDEA 2: DATA (DAT)\nData are central to computing innovations because they communicate\ninitial conditions to programs and represent new knowledge. Computers\nconsume data, transform data, and produce new data, allowing users\nto create new information or knowledge to solve problems through the\ninterpretation of those data. Computers store data digitally, which means\nthat the data must be manipulated in order to be presented in a useful way\nto the user.",
  3: "BIG IDEA 3: ALGORITHMS AND PROGRAMMING (AAP)\nProgrammers integrate algorithms and abstraction to create programs\nfor creative purposes and to solve problems. Using multiple program\nstatements in a specified order, making decisions, and repeating the same\nprocess multiple times are the building blocks of programs. Incorporating\nelements of abstraction—by breaking problems down into interacting\npieces, each with their own purpose—makes writing complex programs\neasier. Programmers need to think algorithmically and use abstraction to\ndefine and interpret processes that are used in a program.",
  4: "BIG IDEA 4: COMPUTING SYSTEMS AND NETWORKS (CSN)\nComputer systems and networks are used to transfer data. One of the\nlargest and most commonly used networks is the Internet. Through a series\nof protocols, the Internet can be used to send and receive information and\nideas throughout the world. Transferring and processing information can be\nslow when done on a single computer, but leveraging multiple computers to\ndo the work at the same time can significantly shorten the time it takes to\ncomplete tasks or solve problems.",
  5: "BIG IDEA 5: IMPACT OF COMPUTING (IOC)\nComputers and computing have revolutionized our lives. To use computing\nsafely and responsibly, we need to be aware of privacy, security, and\nethical issues. As programmers, we need to understand the potential\nimpacts of our programs and be responsible for the consequences.\nAs computer users, we need to understand any potential beneficial or\nharmful effects and how to protect ourselves and our privacy when using\na computer.",
};

let scaleFactor = 18;
let wiggleAmplitude = 10;
let ringRadius = 200;
let dragIndex = -1;
let textSizeSmall = 11;
// select student UI
let selectedStudentIndex = -1;
let studentDropdown;
let leftArrowBtn, rightArrowBtn;

function setup() {
  createCanvas(1000, 1000);
  textFont("monospace"); // Use fixed width font
  textSize(textSizeSmall);

  let centerX = width / 2 - 150;
  let centerY = height / 2 + 60;

  for (let i = 0; i < bigIdeas.length; i++) {
    let angle = TWO_PI * (i / bigIdeas.length) - HALF_PI;
    let radius = sqrt(bigIdeas[i].weight) * scaleFactor;

    bigIdeas[i].baseX = centerX + cos(angle) * ringRadius - 20;
    bigIdeas[i].baseY = centerY + sin(angle) * ringRadius - 80;
    bigIdeas[i].dragging = false;
    bigIdeas[i].radius = radius;
    bigIdeas[i].offsetX = 0;
    bigIdeas[i].offsetY = 0;
    bigIdeas[i].noiseSeedX = random(1000);
    bigIdeas[i].noiseSeedY = random(1000);
  }
  createStudentUI();
  noLoop();
}

function draw() {
  background(255);
  drawBigIdeaLegend();
  drawPracticesLegend();

  // Calculate the center of all circles
  let avgX = 0;
  let avgY = 0;
  for (let i = 0; i < bigIdeas.length; i++) {
    let idea = bigIdeas[i];
    if (!idea.dragging) {
      idea.offsetX = map(noise(frameCount * 0.005 + idea.noiseSeedX), 0, 1, -wiggleAmplitude, wiggleAmplitude);
      idea.offsetY = map(noise(frameCount * 0.005 + idea.noiseSeedY), 0, 1, -wiggleAmplitude, wiggleAmplitude);
    }
    avgX += idea.baseX + idea.offsetX;
    avgY += idea.baseY + idea.offsetY;
  }
  avgX /= bigIdeas.length;
  avgY /= bigIdeas.length;

  // Draw student name and overall percent in center of circles if selected
  if (selectedStudentIndex >= 0 && students[selectedStudentIndex]) {
    let student = students[selectedStudentIndex];
    textAlign(CENTER, CENTER);
    textFont("monospace");
    textStyle(BOLD);
    textSize(24);
    fill(0);
    text(student.name, avgX, avgY);

    // Calculate overall percent (average of 5 scores, out of 5)
    let total = 0;
    let count = 0;
    for (let idea of bigIdeas) {
      total += student[idea.acronym];
      count++;
    }
    let percent = ((total / (count * 5)) * 100).toFixed(1) + "%";
    textStyle(NORMAL);
    textSize(16);
    textFont("monospace");
    text(percent, avgX, avgY + 28);
  }

  for (let i = 0; i < bigIdeas.length; i++) {
    let idea = bigIdeas[i];
    let x = idea.baseX + idea.offsetX;
    let y = idea.baseY + idea.offsetY;

    stroke("#d8d8d8");
    strokeWeight(1);
    fill(idea.color);
    ellipse(x, y, idea.radius * 2);
    noStroke();

    let label = idea.acronym;
    textSize(24);
    textStyle(BOLD);
    fill(0);
    textFont("monospace");
    drawCircleLabels(label, x, y);

    // --- Use the same bar dimensions as drawBars ---
    let barCount = 5;
    let barWidth = (20 * 2) / 3;
    let barHeight = (10 * 2) / 3;
    let spacing = (5 * 2) / 3 + 3;
    let totalBarsWidth = barCount * barWidth + (barCount - 1) * spacing;
    let barsX = x - totalBarsWidth / 2;
    let barsY = y + idea.radius + 18; // 18px below the circle

    let barsToShow = barCount;
    let score = null;
    if (selectedStudentIndex >= 0 && students[selectedStudentIndex]) {
      barsToShow = students[selectedStudentIndex][idea.acronym];
      score = barsToShow;
    }

    // Draw score text on the left of the bars
    if (score !== null) {
      textAlign(RIGHT, CENTER);
      textFont("monospace");
      textStyle(NORMAL);
      textSize(textSizeSmall);
      fill(0);
      text(`${score} of 5`, barsX - 10, barsY + barHeight / 2);
    }

    // Draw the bars horizontally
    drawBars(barsX, barsY, idea.color, barsToShow, true);
  }
  drawPracticeTooltips();
  drawBigIdeaTooltips();
}

function createStudentUI() {
  // Remove old UI if exists
  if (studentDropdown) studentDropdown.remove();
  if (leftArrowBtn) leftArrowBtn.remove();
  if (rightArrowBtn) rightArrowBtn.remove();

  // Dropdown
  studentDropdown = createSelect();
  studentDropdown.position(40 + 40, 40 + bigIdeas.length * 20 + 20);
  studentDropdown.style("font-family", "monospace");
  studentDropdown.option("Select a Student", -1);
  students.forEach((s, i) => studentDropdown.option(s.name, i));
  studentDropdown.selected(selectedStudentIndex >= 0 ? selectedStudentIndex : -1);
  studentDropdown.changed(() => {
    selectedStudentIndex = int(studentDropdown.value());
    redraw();
  });

  // Left arrow button
  leftArrowBtn = createButton("←");
  leftArrowBtn.position(studentDropdown.x - 35, studentDropdown.y - 2);
  leftArrowBtn.size(30, 28);
  leftArrowBtn.style("font-size", "18px");
  leftArrowBtn.mousePressed(() => {
    if (students.length === 0) return;
    if (selectedStudentIndex <= 0) selectedStudentIndex = students.length - 1;
    else selectedStudentIndex--;
    studentDropdown.selected(selectedStudentIndex);
    redraw();
  });

  // Right arrow button
  rightArrowBtn = createButton("→");
  rightArrowBtn.position(studentDropdown.x + studentDropdown.elt.offsetWidth + 5, studentDropdown.y - 2);
  rightArrowBtn.size(30, 28);
  rightArrowBtn.style("font-size", "18px");
  rightArrowBtn.mousePressed(() => {
    if (students.length === 0) return;
    if (selectedStudentIndex >= students.length - 1) selectedStudentIndex = 0;
    else selectedStudentIndex++;
    studentDropdown.selected(selectedStudentIndex);
    redraw();
  });
}

function drawBars(x, y, colorCode, barsToShow = 5, horizontal = true) {
  let barCount = 5;
  let barWidth = (20 * 2) / 3;
  let barHeight = (10 * 2) / 3;
  let spacing = (5 * 2) / 3 + 3;

  if (horizontal) {
    // Draw bars left-to-right, centered at (x, y)
    for (let i = 0; i < barCount; i++) {
      // Always draw 5 outlines
      stroke("#d8d8d8");
      strokeWeight(1);
      fill(255, 0);
      rect(x + i * (barWidth + spacing) - 2, y - 2, barWidth + 4, barHeight + 4, 4);

      // Draw the colored bar only if within barsToShow
      if (i < barsToShow) {
        noStroke();
        fill(colorCode);
        rect(x + i * (barWidth + spacing), y, barWidth, barHeight, 2);
      }
    }
  } else {
    // Original vertical bars (not used in this case)
    for (let i = 0; i < barCount; i++) {
      stroke("#d8d8d8");
      strokeWeight(1);
      fill(255, 0);
      rect(x - 2, y + i * (barHeight + spacing) - 2, barWidth + 4, barHeight + 4, 4);

      if (i < barsToShow) {
        noStroke();
        fill(colorCode);
        rect(x, y + i * (barHeight + spacing), barWidth, barHeight, 2);
      }
    }
  }
}

function drawCircleLabels(str, centerX, centerY) {
  // Draw white text centered in the circle
  push();
  fill(255);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(str, centerX, centerY);
  pop();
}

function drawBigIdeaLegend() {
  let legendX = 40;
  let legendY = 40;
  let lineHeight = 22 * 0.9;

  fill(0);
  textAlign(LEFT, TOP);
  textSize(textSizeSmall);
  text("Big Ideas", legendX, legendY - 30);
  textStyle(NORMAL);

  textSize(textSizeSmall);
  for (let i = 0; i < bigIdeas.length; i++) {
    let idea = bigIdeas[i];
    fill(idea.color);
    ellipse(legendX, legendY + i * lineHeight, 12);

    fill(0);
    text(`${idea.number}. ${idea.acronym} – ${idea.label} (${idea.weight}%)`, legendX + 20, legendY - 6 + i * lineHeight);
  }
}

function drawPracticesLegend() {
  let startX = width - 670;
  let startY = 40;
  let rectSize = 15;
  let lineHeight = 22 * 0.9; // Match top-left legend line spacing

  fill(0);
  textSize(textSizeSmall);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text("Computational Thinking Practices", startX, startY - 30);
  textStyle(NORMAL);
  textSize(textSizeSmall);
  for (let i = 0; i < practices.length; i++) {
    let p = practices[i];
    let y = startY + i * lineHeight;
    p.x = startX;
    p.y = y;
    p.w = rectSize;
    p.h = rectSize;

    fill(p.color);
    rect(p.x, p.y, p.w, p.h, 3);

    fill(0);
    text(`${p.number}. ${p.label}`, p.x + rectSize + 10, p.y - 2);
  }
}

function drawPracticeTooltips() {
  for (let i = 0; i < practices.length; i++) {
    let p = practices[i];
    let labelX = p.x + p.w + 10;
    let labelY = p.y;
    let labelW = 250;
    let labelH = 20;

    let isHover = (mouseX >= p.x && mouseX <= p.x + p.w && mouseY >= p.y && mouseY <= p.y + p.h) || (mouseX >= labelX && mouseX <= labelX + labelW && mouseY >= labelY && mouseY <= labelY + labelH);

    if (isHover) {
      let skills = practiceSkills[p.number];
      let lineHeight = 18;
      let boxWidth = 0;

      for (let s of skills) {
        let parts = s.split(" ");
        let rest = parts.slice(1).join(" ");
        let totalW = textWidth(rest) + textWidth(parts[0]) + 30;
        if (totalW > boxWidth) boxWidth = totalW;
      }

      let boxHeight = skills.length * (lineHeight + 6) + 10;
      let boxX = mouseX + 15;
      let boxY = mouseY + 15;

      fill(255);
      stroke(0);
      strokeWeight(1);
      rect(boxX, boxY, boxWidth + 20, boxHeight, 6);

      noStroke();
      textAlign(LEFT, TOP);
      textSize(textSizeSmall);

      for (let j = 0; j < skills.length; j++) {
        let line = skills[j];
        let parts = line.split(" ");
        let code = parts[0];
        let rest = parts.slice(1).join(" ");
        let textY = boxY + 10 + j * (lineHeight + 6);

        let codeW = textWidth(code) + 6;
        fill(p.color);
        rect(boxX + 10, textY, codeW, lineHeight - 2, 3);

        fill(255);
        text(code, boxX + 13, textY + 1);
        fill(0);
        text(rest, boxX + 20 + textWidth(code), textY + 1);
      }
    }
  }
}

function drawBigIdeaTooltips() {
  let legendX = 40;
  let legendY = 40;
  let lineHeight = 22 * 0.9;

  textSize(textSizeSmall);
  textAlign(LEFT, TOP);

  for (let i = 0; i < bigIdeas.length; i++) {
    let idea = bigIdeas[i];
    let x = legendX;
    let y = legendY + i * lineHeight;
    let r = 12;
    let textX = x + 20;
    let textW = textWidth(`${idea.number}. ${idea.label}`);
    let hover = (mouseX > x - r && mouseX < x + r && mouseY > y - r && mouseY < y + r) || (mouseX > textX && mouseX < textX + textW && mouseY > y - 6 && mouseY < y + 10);

    if (hover) {
      let desc = bigIdeaDescriptions[idea.number];
      let lines = desc.split("\n");
      let maxW = max(lines.map((l) => textWidth(l))) + 20;
      let boxH = lines.length * 18 + 20;
      let boxX = mouseX + 15;
      let boxY = mouseY + 15;

      fill(255);
      stroke(0);
      rect(boxX, boxY, maxW, boxH, 6);

      noStroke();
      fill(0);
      for (let j = 0; j < lines.length; j++) {
        text(lines[j], boxX + 10, boxY + 10 + j * 18);
      }
    }
  }
}

// Drag logic
function mousePressed() {
  for (let i = 0; i < bigIdeas.length; i++) {
    let idea = bigIdeas[i];
    let x = idea.baseX + idea.offsetX;
    let y = idea.baseY + idea.offsetY;
    if (dist(mouseX, mouseY, x, y) < idea.radius) {
      idea.dragging = true;
      idea.dragOffsetX = mouseX - x;
      idea.dragOffsetY = mouseY - y;
      dragIndex = i;
      break;
    }
  }
}

function mouseDragged() {
  if (dragIndex >= 0) {
    let idea = bigIdeas[dragIndex];
    idea.baseX = mouseX - idea.dragOffsetX;
    idea.baseY = mouseY - idea.dragOffsetY;
  }
}

function mouseReleased() {
  if (dragIndex >= 0) {
    bigIdeas[dragIndex].dragging = false;
    dragIndex = -1;
  }
}
