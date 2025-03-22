gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Navbar Active State & Scroll Effect
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar.offsetHeight;
    let timeout;
    window.addEventListener('scroll', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            let current = '';
            sections.forEach(section => {
                if (window.scrollY >= section.offsetTop - navbarHeight - 20) {
                    current = section.getAttribute('id');
                }
            });
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
            });
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, 50);
    });

    // Hamburger Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTopBtn.classList.toggle('show', window.scrollY > 300);
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Dynamic Footer Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Project Details Modal
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const closeBtn = document.querySelector('.close-btn');

    const projects = {
        1: {
            title: "Enterprise Data Lake for Financial Analytics (Wells Fargo)",
            details: `
                <p>At Wells Fargo, I designed and implemented an enterprise data lake architecture to handle terabytes of financial data. Key achievements include:</p>
                <ul>
                    <li>Developed high-performance ETL pipelines using AWS Glue and Lambda, reducing data transformation time by 50%.</li>
                    <li>Implemented real-time streaming pipelines with Amazon Kinesis and Flink, reducing data ingestion latency by 60% for real-time financial transaction processing.</li>
                    <li>Built and optimized a data warehouse in Amazon Redshift, reducing query execution time by 60% through distribution keys, sort keys, and query tuning.</li>
                    <li>Designed data marts using Athena, AWS Glue, and QuickSight, accelerating business reporting by 70%.</li>
                    <li>Automated CI/CD pipelines with Terraform, AWS CloudFormation, and CodePipeline, reducing deployment time by 70%.</li>
                    <li>Enforced data security and compliance using AWS IAM, Lake Formation, and Amazon Macie, ensuring GDPR, SOC 2, and PCI DSS compliance.</li>
                    <li>Reduced AWS compute costs by 25% by optimizing Glue job parallelism and automating S3 lifecycle policies.</li>
                </ul>
            `
        },
        2: {
            title: "Real-Time Data Ingestion Pipeline (eClerx)",
            details: `
                <p>At eClerx, I engineered a real-time data ingestion pipeline to enable low-latency data processing. Key achievements include:</p>
                <ul>
                    <li>Built real-time data ingestion pipelines using Amazon Kinesis, Lambda, and DynamoDB Streams, reducing data processing latency by 50%.</li>
                    <li>Implemented event-driven architectures with Amazon EventBridge and Step Functions, automating workflow execution and cutting manual overhead by 60%.</li>
                    <li>Optimized streaming data ingestion with Apache Flink on AWS Kinesis, improving real-time analytics performance.</li>
                    <li>Designed and optimized a data warehouse in Amazon Redshift, improving query performance by 60% through indexing and partitioning.</li>
                    <li>Built analytical data marts using Redshift, Athena, and Glue, reducing query execution time by 35%.</li>
                    <li>Enhanced security and data governance using AWS IAM, Lake Formation, and KMS, ensuring 100% compliance with GDPR and SOC 2.</li>
                    <li>Reduced AWS costs by 25% by optimizing Glue job execution and automating S3 lifecycle policies.</li>
                </ul>
            `
        },
        3: {
            title: "Cloud Data Processing Pipeline (Wells Fargo)",
            details: `
                <p>At Wells Fargo, I designed and implemented an end-to-end data processing pipeline on Google Cloud Platform (GCP) to enhance data accessibility and streamline financial reporting. Key achievements include:</p>
                <ul>
                    <li>Built a scalable data ingestion pipeline using Google Cloud Storage, Dataflow, and Pub/Sub, reducing data processing time by 40% and enabling near real-time data analytics.</li>
                    <li>Developed and automated ETL pipelines using Apache Airflow and dbt, ensuring efficient data transformation, schema evolution, and metadata management.</li>
                    <li>Designed and optimized a data warehouse architecture on BigQuery, implementing partitioning, clustering, and query optimization, reducing query execution time by 50%</li>
                    <li>Built and deployed machine learning models using Vertex AI, integrating model inference with data processing pipelines for predictive analytics.</li>
                    <li>Deployed infrastructure using Terraform and Docker, automating setup and enhancing deployment efficiency by 60%.</li>
                    <li>Implemented fine-grained security controls using IAM policies and service accounts, ensuring data governance and compliance.</li>
                    <li>Reduced compute costs by 25% by optimizing dataflow job parallelism, caching, and automated lifecycle management.</li>
                    <li>Integrated real-time monitoring and logging with Cloud Logging and Monitoring, ensuring 99.9% pipeline reliability.</li>
                </ul>
            `
        }
    };

    document.querySelectorAll('.project-btn').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projects[projectId];
            modalTitle.textContent = project.title;
            modalDetails.innerHTML = project.details;
            modal.style.display = 'flex';
            gsap.fromTo(modal, 
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
            );
        });
    });

    closeBtn.addEventListener('click', () => {
        gsap.to(modal, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
                modal.style.display = 'none';
            }
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            gsap.to(modal, {
                opacity: 0,
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.out',
                onComplete: () => {
                    modal.style.display = 'none';
                }
            });
        }
    });

    // Animations
    gsap.from('.nav-links a', { opacity: 0, y: -10, stagger: 0.05, duration: 0.5, ease: 'power2.out', delay: 0.2 });
    gsap.from('.landing-title', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
    gsap.from('.landing-subtitle', { opacity: 0, y: 20, duration: 0.5, delay: 0.1, ease: 'power2.out' });
    gsap.from('.landing-tagline', { opacity: 0, y: 20, duration: 0.5, delay: 0.2, ease: 'power2.out' });
    gsap.from('.btn-group > *', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, delay: 0.3, ease: 'power2.out' });

    document.getElementById('explore-btn').addEventListener('click', () => {
        window.scrollTo({ top: document.querySelector('#projects').offsetTop - navbarHeight - 20, behavior: 'smooth' });
    });

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            window.scrollTo({ top: target.offsetTop - navbarHeight - 20, behavior: 'smooth' });
            navLinks.classList.remove('show');
        });
    });

    gsap.utils.toArray('.section-title').forEach(h2 => {
        gsap.from(h2, {
            scrollTrigger: { trigger: h2, start: 'top 90%' },
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    gsap.from('.profile-img', { scrollTrigger: { trigger: '.about', start: 'top 90%' }, opacity: 0, scale: 0.95, duration: 0.5, ease: 'power2.out' });
    gsap.from('.about-text p', { scrollTrigger: { trigger: '.about', start: 'top 90%' }, opacity: 0, y: 20, duration: 0.5, delay: 0.1, ease: 'power2.out' });
    gsap.from('.social-btn', { scrollTrigger: { trigger: '.about', start: 'top 90%' }, opacity: 0, x: -10, stagger: 0.1, duration: 0.5, delay: 0.2, ease: 'power2.out' });

    gsap.from('.skill-item', { scrollTrigger: { trigger: '.skills', start: 'top 90%' }, opacity: 0, y: 10, stagger: 0.1, duration: 0.5, ease: 'power2.out' });

    gsap.from('.exp-card', { scrollTrigger: { trigger: '.experience', start: 'top 90%' }, opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power2.out' });

    gsap.from('.cert-card', { scrollTrigger: { trigger: '.certifications', start: 'top 90%' }, opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power2.out' });
    gsap.from('.cert-btn', { scrollTrigger: { trigger: '.certifications', start: 'top 90%' }, opacity: 0, y: 10, stagger: 0.1, duration: 0.5, delay: 0.2, ease: 'power2.out' });

    gsap.from('.project-card', { scrollTrigger: { trigger: '.projects', start: 'top 90%' }, opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ease: 'power2.out' });

    gsap.from('.contact-info', { scrollTrigger: { trigger: '.contact', start: 'top 90%' }, opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });
    gsap.from('.contact-form', { scrollTrigger: { trigger: '.contact', start: 'top 90%' }, opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' });

    // Form Submission to Google Form
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.querySelector('.form-message');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Client-side validation
        if (!name || !emailRegex.test(email) || !message) {
            formMessage.textContent = 'Please fill in all fields correctly.';
            formMessage.style.color = '#e63946';
            return;
        }

        // Prepare the data for Google Form submission
        const formData = new FormData();
        formData.append('entry.513423752', name); // Name field
        formData.append('entry.248314180', email); // Email field
        formData.append('entry.1973154333', message); // Message field

        try {
            const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSeJ8djuUinxUVpzAwWaLT5Q4BXSKBeRc8rcBcm2TUj7jLI_dg/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Required for Google Forms submission
            });

            // Since 'no-cors' mode doesn't allow reading the response, we assume success if no error is thrown
            formMessage.textContent = 'Message sent successfully!';
            formMessage.style.color = '#2a9d8f';
            contactForm.reset();
        } catch (error) {
            formMessage.textContent = 'Failed to send message. Please try again.';
            formMessage.style.color = '#e63946';
            console.error('Error submitting form:', error);
        }
    });
});