// services/sequenceService.js

class SequenceService {
    constructor(questionService) {
      this.questionService = questionService;
      this.usedSequences = new Set(); // Tracks used sequences in memory
    }
  
    // Generates unique shuffle sequence
    async generateUniqueSequence(teamCount) {
      const allQuestions = await this.questionService.getAllQuestions();
      const totalQuestions = Math.min(allQuestions.length, 30);
      const sequences = [];
  
      // Fisher-Yates shuffle with uniqueness check
      const shuffle = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      };
  
      // Generate unique sequences
      while (sequences.length < teamCount) {
        const sequence = shuffle(Array.from({length: totalQuestions}, (_, i) => i + 1));
        const sequenceKey = sequence.join(',');
  
        if (!this.usedSequences.has(sequenceKey)) {
          this.usedSequences.add(sequenceKey);
          sequences.push(sequence);
        }
      }
  
      return sequences;
    }
  }
  
  export default SequenceService;