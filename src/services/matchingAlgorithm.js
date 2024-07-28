/**
 * Matching Algorithm Module
 * 
 * This module provides functions for calculating match scores between
 * job requirements and candidate skills, and finding matches for jobs.
 */

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./odysseus.db');

/**
 * Calculates the match score between job skills and candidate skills
 * @param {Array} jobSkills - Array of skills required for the job
 * @param {Array} candidateSkills - Array of skills possessed by the candidate
 * @returns {number} The match score as a percentage
 */
const calculateMatchScore = (jobSkills, candidateSkills) => {
  const matchingSkills = jobSkills.filter(skill => candidateSkills.includes(skill));
  return (matchingSkills.length / jobSkills.length) * 100;
};

/**
 * Finds matches for a given job
 * @param {number} jobId - The ID of the job to find matches for
 * @returns {Promise<Array>} A promise that resolves to an array of matching candidates
 */
const findMatches = (jobId) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT skills FROM jobs WHERE id = ?', [jobId], (err, job) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (!job) {
        reject(new Error('Job not found'));
        return;
      }

      const jobSkills = job.skills.split(',');
      
      db.all('SELECT id, name, skills FROM candidates', [], (err, candidates) => {
        if (err) {
          reject(err);
          return;
        }
        
        const matches = candidates.map(candidate => {
          const candidateSkills = candidate.skills.split(',');
          const matchScore = calculateMatchScore(jobSkills, candidateSkills);
          return { ...candidate, matchScore };
        });
        
        matches.sort((a, b) => b.matchScore - a.matchScore);
        resolve(matches);
      });
    });
  });
};

module.exports = { findMatches };

// Note: The following code should be in your server.js file:
// const { findMatches } = require('./services/matchingAlgorithm');
// 
// app.get('/api/matches/:jobId', async (req, res) => {
//   try {
//     const matches = await findMatches(req.params.jobId);
//     res.json(matches);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });