-- Create enum for project types
CREATE TYPE project_type AS ENUM ('mini', 'major');

-- Create enum for difficulty levels
CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');

-- Create projects table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  detailed_description TEXT NOT NULL,
  project_type project_type NOT NULL,
  difficulty difficulty_level NOT NULL,
  category TEXT NOT NULL,
  tech_stack TEXT[] NOT NULL,
  learning_outcomes TEXT[] NOT NULL,
  estimated_duration TEXT NOT NULL,
  prerequisites TEXT[],
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (students can view all projects)
CREATE POLICY "Anyone can view projects"
  ON public.projects
  FOR SELECT
  TO public
  USING (true);

-- Create index for faster queries
CREATE INDEX idx_projects_type ON public.projects(project_type);
CREATE INDEX idx_projects_category ON public.projects(category);
CREATE INDEX idx_projects_difficulty ON public.projects(difficulty);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample projects
INSERT INTO public.projects (title, description, detailed_description, project_type, difficulty, category, tech_stack, learning_outcomes, estimated_duration, prerequisites) VALUES
(
  'Personal Portfolio Website',
  'Build a responsive portfolio website to showcase your skills and projects',
  'Create a modern, responsive portfolio website that effectively presents your work, skills, and experience. Learn fundamental web development concepts including HTML structure, CSS styling, responsive design principles, and deployment. This project will serve as your professional online presence.',
  'mini',
  'beginner',
  'Web Development',
  ARRAY['HTML', 'CSS', 'JavaScript'],
  ARRAY['Responsive design principles', 'CSS Flexbox and Grid', 'Basic JavaScript DOM manipulation', 'Web hosting and deployment'],
  '1-2 weeks',
  ARRAY['Basic HTML knowledge', 'Understanding of CSS']
),
(
  'Weather Dashboard App',
  'Create a weather application using real-time API data',
  'Develop a weather dashboard that fetches and displays real-time weather information using external APIs. Learn to work with asynchronous JavaScript, API integration, data parsing, and creating dynamic user interfaces. Implement features like city search, current weather, and multi-day forecasts.',
  'mini',
  'intermediate',
  'Web Development',
  ARRAY['React', 'JavaScript', 'REST APIs', 'CSS'],
  ARRAY['API integration', 'Async/await patterns', 'State management', 'Error handling', 'UI/UX design'],
  '2-3 weeks',
  ARRAY['JavaScript fundamentals', 'Basic React knowledge', 'Understanding of HTTP requests']
),
(
  'Task Management System',
  'Build a full-featured task management application with user authentication',
  'Create a comprehensive task management system with user authentication, CRUD operations, and real-time updates. Implement features like task creation, editing, deletion, categorization, priority levels, and due dates. Learn about database design, backend development, authentication flows, and building scalable applications.',
  'mini',
  'intermediate',
  'Full Stack',
  ARRAY['React', 'Node.js', 'PostgreSQL', 'Express'],
  ARRAY['Full-stack development', 'Database design', 'RESTful API creation', 'Authentication implementation', 'CRUD operations'],
  '3-4 weeks',
  ARRAY['JavaScript/React basics', 'Understanding of databases', 'Basic Node.js knowledge']
),
(
  'Machine Learning Image Classifier',
  'Develop an image classification system using deep learning',
  'Build a machine learning model that can classify images into different categories using convolutional neural networks (CNNs). Learn about data preprocessing, model training, evaluation metrics, and deployment. Work with popular ML frameworks and understand the complete ML pipeline from data collection to model deployment.',
  'mini',
  'advanced',
  'Machine Learning',
  ARRAY['Python', 'TensorFlow', 'Keras', 'NumPy'],
  ARRAY['Deep learning fundamentals', 'CNN architecture', 'Model training and evaluation', 'Data preprocessing', 'Transfer learning'],
  '4-5 weeks',
  ARRAY['Python programming', 'Basic ML concepts', 'Linear algebra basics', 'Calculus fundamentals']
),
(
  'E-Commerce Platform',
  'Build a complete e-commerce platform with payment integration',
  'Develop a full-featured e-commerce platform with product catalog, shopping cart, user authentication, order management, and payment gateway integration. Implement advanced features like inventory management, order tracking, email notifications, and admin dashboard. Learn about complex state management, secure payment processing, and building production-ready applications.',
  'major',
  'advanced',
  'Full Stack',
  ARRAY['React', 'Node.js', 'MongoDB', 'Stripe API', 'Redis'],
  ARRAY['Microservices architecture', 'Payment gateway integration', 'Session management', 'Security best practices', 'Scalable database design', 'Email service integration'],
  '8-12 weeks',
  ARRAY['Strong full-stack knowledge', 'Database experience', 'Understanding of payment systems', 'Security awareness']
),
(
  'Social Media Analytics Dashboard',
  'Create an analytics platform for social media data visualization',
  'Build a comprehensive analytics dashboard that collects, processes, and visualizes social media data. Implement data pipelines, real-time updates, interactive charts, sentiment analysis, and trend detection. Learn about big data processing, data visualization techniques, and building scalable analytics systems.',
  'major',
  'advanced',
  'Data Science',
  ARRAY['Python', 'React', 'PostgreSQL', 'D3.js', 'Apache Kafka'],
  ARRAY['Data pipeline architecture', 'Real-time data processing', 'Data visualization', 'Sentiment analysis', 'Time series analysis', 'Dashboard design'],
  '10-14 weeks',
  ARRAY['Python proficiency', 'Data analysis skills', 'Database knowledge', 'Statistics fundamentals', 'API development']
),
(
  'IoT Home Automation System',
  'Design and implement a complete home automation system',
  'Create an IoT-based home automation system that controls and monitors home devices. Implement features like remote device control, sensor data collection, automation rules, voice control integration, and mobile app interface. Learn about IoT protocols, embedded systems, cloud integration, and real-time communication.',
  'major',
  'advanced',
  'IoT',
  ARRAY['Arduino/Raspberry Pi', 'Python', 'React Native', 'MQTT', 'AWS IoT'],
  ARRAY['IoT architecture', 'Embedded programming', 'Wireless communication', 'Cloud integration', 'Mobile app development', 'Real-time systems'],
  '12-16 weeks',
  ARRAY['Electronics basics', 'Programming fundamentals', 'Networking concepts', 'Basic mobile development']
),
(
  'Blog Platform with CMS',
  'Build a blogging platform with content management system',
  'Create a blogging platform where users can create, edit, and publish blog posts. Include features like rich text editor, image uploads, comments, tags, and search functionality. Perfect for learning CRUD operations and content management.',
  'mini',
  'beginner',
  'Web Development',
  ARRAY['React', 'Node.js', 'MongoDB', 'Express'],
  ARRAY['CRUD operations', 'File uploads', 'Rich text editing', 'Search implementation', 'Basic backend development'],
  '3-4 weeks',
  ARRAY['HTML/CSS basics', 'JavaScript fundamentals', 'Basic React knowledge']
),
(
  'AI Chatbot Assistant',
  'Develop an AI-powered chatbot using natural language processing',
  'Build an intelligent chatbot that can understand and respond to user queries using NLP. Implement features like intent recognition, context management, and integration with various AI services. Learn about conversational AI, prompt engineering, and creating engaging user experiences.',
  'major',
  'intermediate',
  'Artificial Intelligence',
  ARRAY['Python', 'React', 'OpenAI API', 'LangChain', 'Vector Database'],
  ARRAY['Natural language processing', 'API integration', 'Conversation design', 'Prompt engineering', 'Vector embeddings', 'AI ethics'],
  '6-8 weeks',
  ARRAY['Python programming', 'Basic AI concepts', 'API development', 'Frontend development']
),
(
  'Recipe Finder App',
  'Create a recipe search and sharing application',
  'Build an app where users can search for recipes, save favorites, and share their own recipes. Integrate with recipe APIs and implement features like ingredient-based search and nutritional information.',
  'mini',
  'beginner',
  'Mobile Development',
  ARRAY['React Native', 'JavaScript', 'Firebase', 'Recipe API'],
  ARRAY['Mobile app development', 'API integration', 'Local storage', 'User interface design', 'Cross-platform development'],
  '2-3 weeks',
  ARRAY['JavaScript basics', 'Basic understanding of mobile apps']
)