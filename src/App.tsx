import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Form from "./Form";

const App = () => {
  const calculateMinMax = (values: number[][]) => {
    let minimum = 0;
    for (let i = 0; i < values.length; i++) {
      // I Assume the sub array, might not always be sorted
      // Therefore i will sort descending to get the lowest value of each array in the first index
      // to save some time
      const sortedArray = values[i].sort((a, b) => a - b);

      // Always set the minimum to the first array
      if (i === 0) {
        minimum = sortedArray[0];
      } else if(sortedArray[0] < minimum) {
        minimum = sortedArray[0]
      }
    }
      
    return minimum;
  };

  const values: number[][] = [
    [1, 2, 3, 4, 5],
    [3, 4, 5, 6, 7],
    [6, 7, 8, 9, 10],
  ];

  
  const values2: number[][] = [
    [13, 2, 8, 9, 1],
    [-1, 0, 100, 20, -50],
    [0, 0, 0],
  ];

  const answer: number = calculateMinMax(values);
  const answer2: number = calculateMinMax(values2);

  console.log("The result of first test case is " + answer);
  console.log("The result of second test case is " + answer2);

  return <Form />;
};

export default App;
