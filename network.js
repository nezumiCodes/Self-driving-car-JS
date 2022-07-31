class NeuralNetwork{
    constructor(neuronCount){
        this.levels = [];
        for(let i=0; i<neuronCount.length-1; i++){
            this.levels.push(new Level(
                neuronCount[i], neuronCount[i+1]
            ));
        }
    }

    static feedForward(givenInputs, network){
        // outputs for first level 
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
        
        // loop through the remaining levels
        for(let i=1; i<network.levels.length; i++){
            outputs = Level.feedForward(outputs, network.levels[i])
        }
        return outputs;
    }
}

class Level{
    constructor(inputCount, outputCount){
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount); //values above each output neuron will fire

        // connect all input to all outputs
        this.weights=[];
        for(let i=0; i<inputCount; i++){
            this.weights[i] = new Array(outputCount);
        }

        Level.#randomise(this);
    }

    static #randomise(level){
        for(let i=0; i<level.inputs.length; i++){
            for(let j=0; j<level.outputs.length; j++){
                level.weights[i][j] = Math.random()*2-1;
            }
        }

        for(let i=0; i<level.biases.length; i++){
            level.biases[i] = Math.random()*2-1;
        }

    }

    /*
    create the model of the neural network
    w*s + b = 0 (s -> input)
                (w,s,b -> vectors)
    level.outputs[i] = sum + level.biases[i] 
    - This can be over/under 1/-1 so we'll need to apply an appropriate function 
      to our outputs in order to limit them to the range of [-1,1] (sigmoid, RelU, hyperbolic tangeant)
    */
    static feedForward(givenInputs,level){
        for(let i=0; i<level.inputs.length; i++){
            level.inputs[i] = givenInputs[i];
        }

        for(let i=0; i<level.outputs.length; i++){
            let sum = 0;
            for(let j=0; j<level.inputs.length; j++){
                sum = level.inputs[j]*level.weights[j][i];
            }
            
            level.outputs[i] = sum>level.biases[i] ? 1 : 0; 
        }
        return level.outputs;
    }
}