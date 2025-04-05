// Percentage Calculator
function setupPercentageCalculator() {
    const calculateBtn = document.getElementById('calculate-percent');
    if (!calculateBtn) return;
  
    const percentOfInput = document.getElementById('percent-of');
    const percentNumberInput = document.getElementById('percent-number');
    const resultElement = document.getElementById('percent-result');
    const percentageOptions = document.querySelectorAll('.percentage-option');
  
    // Set up percentage options
    percentageOptions.forEach(option => {
      option.addEventListener('click', () => {
        percentageOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Update the calculation based on option
        calculatePercentage();
      });
    });
  
    // Main calculation function
    function calculatePercentage() {
      const percent = parseFloat(percentOfInput.value);
      const number = parseFloat(percentNumberInput.value);
      
      if (isNaN(percent) || isNaN(number)) {
        resultElement.textContent = 'Please enter valid numbers';
        return;
      }
  
      const activeOption = document.querySelector('.percentage-option.active');
      let result;
      
      switch(activeOption?.dataset.type) {
        case 'of':
          result = (percent / 100) * number;
          break;
        case 'increase':
          result = number + (number * (percent / 100));
          break;
        case 'decrease':
          result = number - (number * (percent / 100));
          break;
        case 'difference':
          result = ((number - percent) / percent) * 100;
          break;
        default:
          result = (percent / 100) * number;
      }
  
      resultElement.textContent = result.toFixed(2);
    }
  
    // Event listeners
    calculateBtn.addEventListener('click', calculatePercentage);
    percentOfInput.addEventListener('input', calculatePercentage);
    percentNumberInput.addEventListener('input', calculatePercentage);
  }
  
  // Pythagorean Theorem Calculator
  function setupPythagoreanCalculator() {
    const calculateBtn = document.getElementById('calculate-pythag');
    if (!calculateBtn) return;
  
    const sideAInput = document.getElementById('pythag-a');
    const sideBInput = document.getElementById('pythag-b');
    const resultElement = document.getElementById('pythag-result');
  
    function calculateHypotenuse() {
      const a = parseFloat(sideAInput.value);
      const b = parseFloat(sideBInput.value);
      
      if (isNaN(a) || isNaN(b)) {
        resultElement.textContent = 'Please enter valid numbers';
        return;
      }
  
      const c = Math.sqrt(a * a + b * b);
      resultElement.textContent = `Hypotenuse (c) = ${c.toFixed(2)}`;
    }
  
    calculateBtn.addEventListener('click', calculateHypotenuse);
    sideAInput.addEventListener('input', calculateHypotenuse);
    sideBInput.addEventListener('input', calculateHypotenuse);
  }
  
  // Quadratic Equation Solver
  function setupQuadraticSolver() {
    const solveBtn = document.getElementById('solve-quadratic');
    if (!solveBtn) return;
  
    const aInput = document.getElementById('quad-a');
    const bInput = document.getElementById('quad-b');
    const cInput = document.getElementById('quad-c');
    const resultElement = document.getElementById('quad-result');
  
    function solveQuadratic() {
      const a = parseFloat(aInput.value);
      const b = parseFloat(bInput.value);
      const c = parseFloat(cInput.value);
      
      if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resultElement.textContent = 'Please enter valid numbers';
        return;
      }
  
      if (a === 0) {
        resultElement.textContent = 'This is not a quadratic equation (a cannot be 0)';
        return;
      }
  
      const discriminant = b * b - 4 * a * c;
      let solution;
  
      if (discriminant > 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        solution = `Two real roots: x₁ = ${root1.toFixed(2)}, x₂ = ${root2.toFixed(2)}`;
      } else if (discriminant === 0) {
        const root = -b / (2 * a);
        solution = `One real root: x = ${root.toFixed(2)}`;
      } else {
        const realPart = (-b / (2 * a)).toFixed(2);
        const imaginaryPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(2);
        solution = `Complex roots: x₁ = ${realPart} + ${imaginaryPart}i, x₂ = ${realPart} - ${imaginaryPart}i`;
      }
  
      resultElement.innerHTML = `
        <p>${solution}</p>
        <p>Discriminant: ${discriminant.toFixed(2)}</p>
      `;
    }
  
    solveBtn.addEventListener('click', solveQuadratic);
    aInput.addEventListener('input', solveQuadratic);
    bInput.addEventListener('input', solveQuadratic);
    cInput.addEventListener('input', solveQuadratic);
  }
  
  // Prime Number Checker
  function setupPrimeChecker() {
    const checkBtn = document.getElementById('check-prime');
    if (!checkBtn) return;
  
    const numberInput = document.getElementById('prime-num');
    const resultElement = document.getElementById('prime-result');
    const historyList = document.getElementById('prime-history-list');
    let history = [];
  
    function checkPrime() {
      const num = parseInt(numberInput.value);
      
      if (isNaN(num)) {
        resultElement.textContent = 'Please enter a valid number';
        return;
      }
  
      if (num < 2) {
        showResult(false);
        return;
      }
  
      // Check for divisibility
      for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
        if (num % i === 0) {
          showResult(false);
          return;
        }
      }
  
      showResult(true);
    }
  
    function showResult(isPrime) {
      const num = parseInt(numberInput.value);
      const resultText = isPrime ? 
        `${num} is a prime number` : 
        `${num} is not a prime number`;
      
      resultElement.textContent = resultText;
      resultElement.className = isPrime ? 'result-prime' : 'result-not-prime';
  
      // Add to history
      addToHistory(num, isPrime);
    }
  
    function addToHistory(num, isPrime) {
      history.unshift({ num, isPrime });
      if (history.length > 5) history.pop();
      
      updateHistoryDisplay();
    }
  
    function updateHistoryDisplay() {
      historyList.innerHTML = history.map(item => `
        <div class="prime-badge ${item.isPrime ? 'prime' : 'not-prime'}">
          ${item.num} ${item.isPrime ? '✓' : '✗'}
        </div>
      `).join('');
    }
  
    checkBtn.addEventListener('click', checkPrime);
    numberInput.addEventListener('input', checkPrime);
  }
  
  // Factorial Calculator
  function setupFactorialCalculator() {
    const calculateBtn = document.getElementById('calculate-factorial');
    if (!calculateBtn) return;
  
    const numberInput = document.getElementById('factorial-num');
    const resultElement = document.getElementById('factorial-result');
  
    function calculateFactorial() {
      const num = parseInt(numberInput.value);
      
      if (isNaN(num)) {
        resultElement.textContent = 'Please enter a valid number';
        return;
      }
  
      if (num < 0) {
        resultElement.textContent = 'Factorial is not defined for negative numbers';
        return;
      }
  
      if (num > 170) {
        resultElement.textContent = 'Number too large (maximum is 170)';
        return;
      }
  
      let result = 1;
      for (let i = 2; i <= num; i++) {
        result *= i;
      }
  
      resultElement.textContent = `${num}! = ${result}`;
    }
  
    calculateBtn.addEventListener('click', calculateFactorial);
    numberInput.addEventListener('input', calculateFactorial);
  }
  
  // Matrix Calculator
  function setupMatrixCalculator() {
    const calculateBtn = document.getElementById('calculate-matrix');
    if (!calculateBtn) return;
  
    const matrixSizeSelect = document.getElementById('matrix-size');
    const matrixContainerA = document.getElementById('matrix-a');
    const matrixContainerB = document.getElementById('matrix-b');
    const matrixResult = document.getElementById('matrix-result');
    const operationSelect = document.getElementById('matrix-operation');
  
    let currentSize = 2;
  
    // Initialize matrix inputs
    function initMatrix(size) {
      currentSize = size;
      matrixContainerA.innerHTML = '';
      matrixContainerB.innerHTML = '';
      
      // Create matrix A
      const matrixA = document.createElement('div');
      matrixA.className = 'matrix-input';
      matrixA.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
      
      for (let i = 0; i < size * size; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.value = '0';
        input.dataset.row = Math.floor(i / size);
        input.dataset.col = i % size;
        matrixA.appendChild(input);
      }
      
      matrixContainerA.appendChild(matrixA);
      
      // Create matrix B for operations that need it
      if (operationSelect.value !== 'determinant' && operationSelect.value !== 'transpose') {
        const matrixB = document.createElement('div');
        matrixB.className = 'matrix-input';
        matrixB.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        
        for (let i = 0; i < size * size; i++) {
          const input = document.createElement('input');
          input.type = 'number';
          input.value = '0';
          input.dataset.row = Math.floor(i / size);
          input.dataset.col = i % size;
          matrixB.appendChild(input);
        }
        
        matrixContainerB.appendChild(matrixB);
      } else {
        matrixContainerB.innerHTML = '<p>Not needed for this operation</p>';
      }
    }
  
    // Perform matrix calculation
    function calculateMatrix() {
      const operation = operationSelect.value;
      const size = currentSize;
      
      // Get matrix A values
      const matrixA = [];
      const inputsA = matrixContainerA.querySelectorAll('input');
      
      for (let i = 0; i < size; i++) {
        matrixA[i] = [];
        for (let j = 0; j < size; j++) {
          matrixA[i][j] = parseFloat(inputsA[i * size + j].value) || 0;
        }
      }
      
      let result;
      
      switch(operation) {
        case 'add':
        case 'subtract':
          // Get matrix B values
          const matrixB = [];
          const inputsB = matrixContainerB.querySelectorAll('input');
          
          for (let i = 0; i < size; i++) {
            matrixB[i] = [];
            for (let j = 0; j < size; j++) {
              matrixB[i][j] = parseFloat(inputsB[i * size + j].value) || 0;
            }
          }
          
          // Perform operation
          result = [];
          for (let i = 0; i < size; i++) {
            result[i] = [];
            for (let j = 0; j < size; j++) {
              result[i][j] = operation === 'add' ? 
                matrixA[i][j] + matrixB[i][j] : 
                matrixA[i][j] - matrixB[i][j];
            }
          }
          break;
          
        case 'multiply':
          // Get matrix B values
          const matrixBMult = [];
          const inputsBMult = matrixContainerB.querySelectorAll('input');
          
          for (let i = 0; i < size; i++) {
            matrixBMult[i] = [];
            for (let j = 0; j < size; j++) {
              matrixBMult[i][j] = parseFloat(inputsBMult[i * size + j].value) || 0;
            }
          }
          
          // Matrix multiplication
          result = [];
          for (let i = 0; i < size; i++) {
            result[i] = [];
            for (let j = 0; j < size; j++) {
              result[i][j] = 0;
              for (let k = 0; k < size; k++) {
                result[i][j] += matrixA[i][k] * matrixBMult[k][j];
              }
            }
          }
          break;
          
        case 'transpose':
          result = [];
          for (let i = 0; i < size; i++) {
            result[i] = [];
            for (let j = 0; j < size; j++) {
              result[i][j] = matrixA[j][i];
            }
          }
          break;
          
        case 'determinant':
          if (size === 2) {
            result = [[
              matrixA[0][0] * matrixA[1][1] - matrixA[0][1] * matrixA[1][0]
            ]];
          } else if (size === 3) {
            result = [[
              matrixA[0][0] * (matrixA[1][1] * matrixA[2][2] - matrixA[1][2] * matrixA[2][1]) -
              matrixA[0][1] * (matrixA[1][0] * matrixA[2][2] - matrixA[1][2] * matrixA[2][0]) +
              matrixA[0][2] * (matrixA[1][0] * matrixA[2][1] - matrixA[1][1] * matrixA[2][0])
            ]];
          } else {
            result = [[ 'Determinant calculation only available for 2x2 and 3x3 matrices' ]];
          }
          break;
      }
      
      // Display result
      displayMatrixResult(result);
    }
  
    function displayMatrixResult(result) {
      matrixResult.innerHTML = '';
      
      if (result[0].length === 1 && result.length === 1) {
        // Single value result (like determinant)
        const valueDiv = document.createElement('div');
        valueDiv.className = 'matrix-single-result';
        valueDiv.textContent = result[0][0];
        matrixResult.appendChild(valueDiv);
      } else {
        // Matrix result
        const resultMatrix = document.createElement('div');
        resultMatrix.className = 'matrix-output';
        resultMatrix.style.gridTemplateColumns = `repeat(${result[0].length}, 1fr)`;
        
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < result[i].length; j++) {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.textContent = result[i][j].toFixed(2);
            resultMatrix.appendChild(cell);
          }
        }
        
        matrixResult.appendChild(resultMatrix);
      }
    }
  
    // Event listeners
    matrixSizeSelect.addEventListener('change', (e) => {
      initMatrix(parseInt(e.target.value));
    });
    
    operationSelect.addEventListener('change', () => {
      initMatrix(currentSize);
    });
    
    calculateBtn.addEventListener('click', calculateMatrix);
    
    // Initialize with default size
    initMatrix(2);
  }
  
  // Unit Converter
  function setupUnitConverter() {
    const convertBtn = document.getElementById('convert-units');
    if (!convertBtn) return;
  
    const amountInput = document.getElementById('unit-amount');
    const fromSelect = document.getElementById('unit-from');
    const toSelect = document.getElementById('unit-to');
    const resultElement = document.getElementById('unit-result');
    const categorySelect = document.getElementById('unit-category');
  
    // Conversion factors
    const conversionTables = {
      length: {
        meters: 1,
        kilometers: 1000,
        centimeters: 0.01,
        millimeters: 0.001,
        inches: 0.0254,
        feet: 0.3048,
        yards: 0.9144,
        miles: 1609.34
      },
      weight: {
        grams: 1,
        kilograms: 1000,
        milligrams: 0.001,
        pounds: 453.592,
        ounces: 28.3495,
        tons: 907185
      },
      temperature: {
        celsius: { convert: (v, to) => to === 'fahrenheit' ? v * 9/5 + 32 : v + 273.15 },
        fahrenheit: { convert: (v, to) => to === 'celsius' ? (v - 32) * 5/9 : (v - 32) * 5/9 + 273.15 },
        kelvin: { convert: (v, to) => to === 'celsius' ? v - 273.15 : (v - 273.15) * 9/5 + 32 }
      }
    };
  
    // Populate unit selects based on category
    function updateUnitOptions() {
      const category = categorySelect.value;
      const units = Object.keys(conversionTables[category]);
      
      fromSelect.innerHTML = units.map(unit => 
        `<option value="${unit}">${unit}</option>`
      ).join('');
      
      toSelect.innerHTML = units.filter(unit => unit !== fromSelect.value).map(unit => 
        `<option value="${unit}">${unit}</option>`
      ).join('');
    }
  
    // Perform conversion
    function convertUnits() {
      const amount = parseFloat(amountInput.value);
      if (isNaN(amount)) {
        resultElement.textContent = 'Please enter a valid amount';
        return;
      }
  
      const category = categorySelect.value;
      const fromUnit = fromSelect.value;
      const toUnit = toSelect.value;
      
      if (category === 'temperature') {
        const result = conversionTables.temperature[fromUnit].convert(amount, toUnit);
        resultElement.textContent = `${amount} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
      } else {
        const fromFactor = conversionTables[category][fromUnit];
        const toFactor = conversionTables[category][toUnit];
        const result = (amount * fromFactor) / toFactor;
        resultElement.textContent = `${amount} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`;
      }
    }
  
    // Event listeners
    categorySelect.addEventListener('change', updateUnitOptions);
    fromSelect.addEventListener('change', () => {
      // Update 'to' select to not have the same unit as 'from'
      const currentTo = toSelect.value;
      const newFrom = fromSelect.value;
      
      if (currentTo === newFrom) {
        const category = categorySelect.value;
        const units = Object.keys(conversionTables[category]);
        const newTo = units.find(unit => unit !== newFrom) || units[0];
        toSelect.value = newTo;
      }
    });
    
    convertBtn.addEventListener('click', convertUnits);
    amountInput.addEventListener('input', convertUnits);
    fromSelect.addEventListener('change', convertUnits);
    toSelect.addEventListener('change', convertUnits);
    
    // Initialize
    updateUnitOptions();
  }
  
  // Graphing Calculator
  function setupGraphingCalculator() {
    const graphCanvas = document.getElementById('graph-canvas');
    if (!graphCanvas) return;
  
    const ctx = graphCanvas.getContext('2d');
    const functionInput = document.getElementById('graph-function');
    const drawBtn = document.getElementById('draw-graph');
    const xMinInput = document.getElementById('x-min');
    const xMaxInput = document.getElementById('x-max');
    
    // Set canvas size
    function resizeCanvas() {
      graphCanvas.width = graphCanvas.offsetWidth;
      graphCanvas.height = graphCanvas.offsetHeight;
      drawGraph();
    }
    
    // Draw the graph
    function drawGraph() {
      const width = graphCanvas.width;
      const height = graphCanvas.height;
      const xMin = parseFloat(xMinInput.value) || -10;
      const xMax = parseFloat(xMaxInput.value) || 10;
      const funcStr = functionInput.value.trim() || 'x';
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw axes
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1;
      
      // X axis
      const yZero = height / 2;
      ctx.beginPath();
      ctx.moveTo(0, yZero);
      ctx.lineTo(width, yZero);
      ctx.stroke();
      
      // Y axis
      const xZero = width / 2;
      ctx.beginPath();
      ctx.moveTo(xZero, 0);
      ctx.lineTo(xZero, height);
      ctx.stroke();
      
      // Draw grid
      ctx.strokeStyle = '#eee';
      ctx.lineWidth = 0.5;
      
      // Vertical grid lines
      for (let x = xMin; x <= xMax; x++) {
        if (x === 0) continue;
        const screenX = ((x - xMin) / (xMax - xMin)) * width;
        ctx.beginPath();
        ctx.moveTo(screenX, 0);
        ctx.lineTo(screenX, height);
        ctx.stroke();
      }
      
      // Horizontal grid lines
      const yRange = (xMax - xMin) * (height / width);
      const yMin = -yRange / 2;
      const yMax = yRange / 2;
      
      for (let y = yMin; y <= yMax; y++) {
        if (y === 0) continue;
        const screenY = height - ((y - yMin) / (yMax - yMin)) * height;
        ctx.beginPath();
        ctx.moveTo(0, screenY);
        ctx.lineTo(width, screenY);
        ctx.stroke();
      }
      
      // Draw function
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      try {
        for (let i = 0; i <= width; i++) {
          const x = xMin + (i / width) * (xMax - xMin);
          const y = evaluateFunction(funcStr, x);
          
          if (isNaN(y)) continue;
          
          const screenX = i;
          const screenY = height - ((y - yMin) / (yMax - yMin)) * height;
          
          if (i === 0) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        
        ctx.stroke();
      } catch (e) {
        console.error('Error drawing graph:', e);
      }
    }
    
    // Evaluate math function
    function evaluateFunction(funcStr, x) {
      // Replace ^ with ** for exponentiation
      const expr = funcStr
        .replace(/\^/g, '**')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/PI/g, 'Math.PI')
        .replace(/E/g, 'Math.E');
      
      try {
        // Use Function constructor to avoid eval
        return new Function('x', `return ${expr}`)(x);
      } catch (e) {
        return NaN;
      }
    }
    
    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    drawBtn.addEventListener('click', drawGraph);
    functionInput.addEventListener('input', drawGraph);
    xMinInput.addEventListener('input', drawGraph);
    xMaxInput.addEventListener('input', drawGraph);
    
    // Initialize
    resizeCanvas();
  }
  
  // Initialize all tools when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    setupPercentageCalculator();
    setupPythagoreanCalculator();
    setupQuadraticSolver();
    setupPrimeChecker();
    setupFactorialCalculator();
    setupMatrixCalculator();
    setupUnitConverter();
    setupGraphingCalculator();
  });