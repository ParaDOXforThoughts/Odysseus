const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Database setup
const db = new sqlite3.Database('./odysseus.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the odysseus database.');
});

app.use(cors());
app.use(express.json());

// Create tables and perform migrations
db.serialize(() => {
  // Create jobs table
  db.run(`CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    company TEXT,
    location TEXT,
    description TEXT,
    skills TEXT,
    salary TEXT,
    jobType TEXT,
    industry TEXT,
    requirements TEXT,
    matchScore INTEGER
  )`);

  // Create candidates table
  db.run(`CREATE TABLE IF NOT EXISTS candidates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    skills TEXT
  )`);

  // Check for missing columns in jobs table and add them if necessary
  db.all("PRAGMA table_info(jobs)", (err, rows) => {
    if (err) {
      console.error("Error checking table structure:", err);
      return;
    }

    const columns = rows.map(row => row.name);
    const missingColumns = ['salary', 'jobType', 'industry', 'requirements', 'matchScore'].filter(col => !columns.includes(col));

    missingColumns.forEach(column => {
      let dataType = column === 'matchScore' ? 'INTEGER' : 'TEXT';
      db.run(`ALTER TABLE jobs ADD COLUMN ${column} ${dataType}`, (err) => {
        if (err) {
          console.error(`Error adding column ${column}:`, err);
        } else {
          console.log(`Added column ${column} to jobs table`);
        }
      });
    });
  });
});

// Matching algorithm
const calculateMatchScore = (jobSkills, candidateSkills) => {
  const matchingSkills = jobSkills.filter(skill => candidateSkills.includes(skill));
  return (matchingSkills.length / jobSkills.length) * 100;
};

// API endpoints
app.get('/api/jobs', (req, res) => {
  db.all('SELECT * FROM jobs', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/jobs', (req, res) => {
  const { title, company, location, description, skills, salary, jobType, industry, requirements, matchScore } = req.body;
  db.run(`INSERT INTO jobs (title, company, location, description, skills, salary, jobType, industry, requirements, matchScore) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, company, location, description, skills.join(','), salary, jobType, industry, JSON.stringify(requirements), matchScore],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

app.get('/api/candidates', (req, res) => {
  db.all('SELECT * FROM candidates', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/candidates', (req, res) => {
  const { name, email, skills } = req.body;
  db.run(`INSERT INTO candidates (name, email, skills) VALUES (?, ?, ?)`,
    [name, email, skills.join(',')],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

app.get('/api/matches/:jobId', (req, res) => {
  const jobId = req.params.jobId;
  db.get('SELECT skills FROM jobs WHERE id = ?', [jobId], (err, job) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }
    const jobSkills = job.skills.split(',');
    db.all('SELECT * FROM candidates', [], (err, candidates) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      const matches = candidates.map(candidate => {
        const candidateSkills = candidate.skills.split(',');
        const matchScore = calculateMatchScore(jobSkills, candidateSkills);
        return { ...candidate, matchScore };
      });
      matches.sort((a, b) => b.matchScore - a.matchScore);
      res.json(matches);
    });
  });
});

// Debug endpoints
app.get('/api/debug/jobs', (req, res) => {
  db.all('SELECT * FROM jobs', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ count: rows.length, jobs: rows });
  });
});

app.post('/api/debug/add-dummy-jobs', (req, res) => {
  const dummyJobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      description: "Join our innovative team to build cutting-edge web applications using React and TypeScript. You'll be working on high-impact projects that shape the future of our digital products.",
      skills: "React,TypeScript,Redux,GraphQL,Jest",
      salary: "$120,000 - $160,000",
      jobType: "Full-time",
      industry: "Technology",
      requirements: JSON.stringify([
        "5+ years of experience with React and modern JavaScript",
        "Strong understanding of state management (Redux, MobX, etc.)",
        "Experience with GraphQL and RESTful APIs",
        "Proficiency in writing unit tests and end-to-end tests",
        "Bachelor's degree in Computer Science or related field"
      ]),
      matchScore: 95
    },
    {
      title: "Data Scientist",
      company: "AI Innovations",
      location: "New York, NY",
      description: "Help us push the boundaries of AI and machine learning. You'll be working on cutting-edge projects in natural language processing and computer vision.",
      skills: "Python,Machine Learning,TensorFlow,PyTorch,SQL",
      salary: "$130,000 - $180,000",
      jobType: "Full-time",
      industry: "Artificial Intelligence",
      requirements: JSON.stringify([
        "MS or PhD in Computer Science, Statistics, or related field",
        "Strong programming skills in Python and experience with ML frameworks",
        "Experience with big data technologies (Hadoop, Spark)",
        "Published research in machine learning is a plus",
        "Excellent problem-solving and communication skills"
      ]),
      matchScore: 89
    },
    {
      title: "UX/UI Designer",
      company: "DesignMasters",
      location: "Los Angeles, CA",
      description: "Create beautiful and intuitive user experiences for our clients' products. You'll be working closely with product managers and developers to bring designs to life.",
      skills: "Figma,Adobe XD,User Research,Prototyping,Interaction Design",
      salary: "$90,000 - $130,000",
      jobType: "Full-time",
      industry: "Design",
      requirements: JSON.stringify([
        "Bachelor's degree in Design, HCI, or related field",
        "3+ years of experience in UX/UI design for digital products",
        "Proficiency in design tools like Figma and Adobe Creative Suite",
        "Strong portfolio demonstrating your design process and outcomes",
        "Experience with design systems and component libraries"
      ]),
      matchScore: 92
    }
  ];

  const stmt = db.prepare(`INSERT INTO jobs (title, company, location, description, skills, salary, jobType, industry, requirements, matchScore) 
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  
  dummyJobs.forEach(job => {
    stmt.run(job.title, job.company, job.location, job.description, job.skills, job.salary, job.jobType, job.industry, job.requirements, job.matchScore);
  });
  
  stmt.finalize((err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Dummy jobs added successfully" });
  });
});

app.get('/api/jobs/:id', (req, res) => {
  const jobId = req.params.id;
  db.get('SELECT * FROM jobs WHERE id = ?', [jobId], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});