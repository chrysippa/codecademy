// Codecademy project - simulate DNA of fictional organism P. aequor

const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNumber, dna) => {
  return {
    specimenNumber,
    dna,
    mutate() {
      const index = Math.floor(Math.random() * 15);
      let newBase = returnRandBase();
      while (newBase === dna[index]) {
        newBase = returnRandBase();
      }
      dna[index] = newBase;
      return dna;
    },
    compareDNA(otherOrganism) {
      let sharedCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrganism.dna[i]) {
          sharedCount++;
        }
      }
      const sharedPercent = sharedCount * 100 / 15;
      return sharedPercent;
    },
    willLikelySurvive() {
      let counter = 0;
      this.dna.forEach(base => {
        if (base === 'G' || base === 'C') {
          counter++;
        }
      });
      const percentCOrG = counter * 100 / 15;
      if (percentCOrG >= 60) {
        return true;
      }
      return false;
    }
  }
};

// Generate a random specimen number between 0-999
const numGenerator = () => Math.floor(Math.random() * 1000);

// Determine which two organisms are the most genetically similar
const mostRelated = population => {
  let mostSimilar = {
    percent: 0,
    organism1: {},
    organism2: {}
  };
  for (let i=0; i<population.length; i++) {
    // j initialized to i+1 - to avoid comparing organism to itself or to others it's already been compared with
    for (let j=i+1; j<population.length; j++) {
        const percentSimilar = population[i].compareDNA(population[j]);
        if (percentSimilar > mostSimilar.percent) {
          mostSimilar.percent = percentSimilar;
          mostSimilar.organism1 = population[i];
          mostSimilar.organism2 = population[j];
        }
    }
  }
  return mostSimilar;
};

// Pretty-print the results of mostRelated()
const logMostRelated = mostSimilar => {
  console.log(`Organisms ${mostSimilar.organism1.specimenNumber} and ${mostSimilar.organism2.specimenNumber} are the most similar, with ${mostSimilar.percent.toFixed(2)}% of their DNA in common.`);
  console.log(`First organism's DNA:`, mostSimilar.organism1.dna);
  console.log(`Second organism's DNA:`, mostSimilar.organism2.dna);
};

// Create a population
const generatePopulation = size => {
  const organisms = [];
  while (organisms.length < size) {
    let specimen = pAequorFactory(numGenerator(), mockUpStrand());
    if (specimen.willLikelySurvive()) {
      organisms.push(specimen);
    }
  }
  return organisms;
};


// Population of 30 organisms likely to survive
// Always returns 60% similar, 66.67%, or 73.33% ?
const hardyOrganismsLarge = generatePopulation(30);
const mostSimilarLarge = mostRelated(hardyOrganismsLarge);
console.log('FROM POPULATION OF 30:');
logMostRelated(mostSimilarLarge);

// Population of 15 organisms likely to survive
// Always returns 60% or 53.33% similar ?
const hardyOrganismsSmall = generatePopulation(15);
const mostSimilarSmall = mostRelated(hardyOrganismsSmall);
console.log('FROM POPULATION OF 15:');
logMostRelated(mostSimilarSmall);

