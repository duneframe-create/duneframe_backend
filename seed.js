require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Project = require('./models/Project');
const TeamMember = require('./models/TeamMember');
const AdminUser = require('./models/AdminUser');
const Service = require('./models/Service');
const Principle = require('./models/Principle');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studio-site';

const sampleProjects = [
  {
    title: 'Plan. Shoot. Deliver.',
    category: 'Commercial',
    client: 'Northline Brands',
    year: 2024,
    coverImage: 'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'sample.mp4',
    description:
      'A high-energy commercial campaign built around crisp product storytelling and cinematic pacing.',
    gallery: [
      'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    featured: true,
    order: 1,
  },
  {
    title: 'Bold. Clear. Cinematic.',
    category: 'Branding',
    client: 'Aether Studio',
    year: 2024,
    coverImage: 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'sample.mp4',
    description:
      'Brand film that defines visual identity through motion, sound design, and restrained typography.',
    gallery: [],
    featured: true,
    order: 2,
  },
  {
    title: 'Visuals That Sell',
    category: 'Commercial',
    client: 'Pulse Retail',
    year: 2023,
    coverImage: 'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'sample.mp4',
    description:
      'Conversion-focused product film series for digital launch campaigns across web and social.',
    gallery: [],
    featured: true,
    order: 3,
  },
  {
    title: 'Narrative in Motion',
    category: 'Documentary',
    client: 'City Archive',
    year: 2023,
    coverImage: 'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'sample.mp4',
    description:
      'Documentary short exploring creative process, craft, and the people behind the frame.',
    gallery: [],
    featured: false,
    order: 4,
  },
  {
    title: 'Sound & Frame',
    category: 'MusicVideo',
    client: 'Night Circuit',
    year: 2025,
    coverImage: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200',
    videoUrl: 'sample.mp4',
    description:
      'Music video with kinetic camera work, practical light setups, and editorial color grade.',
    gallery: [],
    featured: false,
    order: 5,
  },
];

const sampleTeam = [
  {
    name: 'Kevin Hart',
    role: 'Executive Producer',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Leads production strategy and client partnerships from concept through delivery.',
    quote: 'Enjoy the process',
    order: 1,
  },
  {
    name: 'Jenny Wilson',
    role: 'Chief Marketing',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Shapes brand voice and go-to-market storytelling across campaigns.',
    quote: 'Stay curious',
    order: 2,
  },
  {
    name: 'Floyd Miles',
    role: 'Creative Director',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Shapes visual language, narrative arcs, and brand-led cinematic direction.',
    quote: 'Enjoy the process',
    order: 3,
  },
  {
    name: 'Arlene Bell',
    role: 'Executive Producer',
    photo: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Keeps productions on track from treatment to final delivery.',
    quote: 'Make it matter',
    order: 4,
  },
];

const sampleServices = [
  {
    title: 'Video productions',
    description:
      'An international digital design studio reimagining how people connect with brands.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    order: 1,
  },
  {
    title: 'Digital media',
    description:
      'We prioritize flexibility, streamlined processes, and creative that positively impacts your business.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    order: 2,
  },
  {
    title: 'Commercial',
    description: 'We are dedicated to transforming businesses by providing expert consulting services.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    order: 3,
  },
  {
    title: 'Content creation',
    description:
      'We are a creative production company that specializes in crafting unique stories to help you better connect with your customers.',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    order: 4,
  },
];

const samplePrinciples = [
  {
    title: 'Take action',
    description:
      'We bring your ideas to life with precision, creativity, and a commitment to excellence.',
    icon: 'target',
    order: 1,
  },
  {
    title: 'Innovation',
    description:
      'We bring your ideas to life with precision, creativity, and a commitment to excellence.',
    icon: 'bulb',
    order: 2,
  },
  {
    title: 'Be honest',
    description:
      'We bring your ideas to life with precision, creativity, and a commitment to excellence.',
    icon: 'thumb',
    order: 3,
  },
  {
    title: 'Unique projects',
    description:
      'We bring your ideas to life with precision, creativity, and a commitment to excellence.',
    icon: 'phone',
    order: 4,
  },
  {
    title: 'Experience',
    description:
      'We bring your ideas to life with precision, creativity, and a commitment to excellence.',
    icon: 'camera',
    order: 5,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Promise.all([
      Project.deleteMany({}),
      TeamMember.deleteMany({}),
      AdminUser.deleteMany({}),
      Service.deleteMany({}),
      Principle.deleteMany({}),
    ]);
    console.log('Cleared Project, TeamMember, AdminUser, Service, and Principle collections');

    // Use create() so Project slug middleware runs (insertMany skips it)
    const projects = [];
    for (const item of sampleProjects) {
      projects.push(await Project.create(item));
    }
    console.log(`Inserted ${projects.length} projects`);

    const team = [];
    for (const member of sampleTeam) {
      team.push(await TeamMember.create(member));
    }
    console.log(`Inserted ${team.length} team members`);

    const services = [];
    for (const item of sampleServices) {
      services.push(await Service.create(item));
    }
    console.log(`Inserted ${services.length} services`);

    const principles = [];
    for (const item of samplePrinciples) {
      principles.push(await Principle.create(item));
    }
    console.log(`Inserted ${principles.length} principles`);

    const passwordHash = await bcrypt.hash('admin123', 10);
    const admin = await AdminUser.create({
      username: 'admin',
      passwordHash,
    });
    console.log(`Created admin user: ${admin.username}`);

    console.log('Seed completed successfully');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
