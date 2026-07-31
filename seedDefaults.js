async function seedDefaultsIfEmpty() {
  const Service = require('./models/Service');
  const Principle = require('./models/Principle');
  const Award = require('./models/Award');
  const Partner = require('./models/Partner');
  const Testimonial = require('./models/Testimonial');
  const Post = require('./models/Post');
  const SiteSettings = require('./models/SiteSettings');
  const TeamMember = require('./models/TeamMember');

  if ((await TeamMember.countDocuments()) === 0) {
    await TeamMember.insertMany([
      {
        name: 'Kevin Hart',
        role: 'Executive Producer',
        photo:
          'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
        bio: 'Leads production strategy and client partnerships from concept through delivery.',
        quote: 'Enjoy the process',
        order: 1,
      },
      {
        name: 'Jenny Wilson',
        role: 'Chief Marketing',
        photo:
          'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
        bio: 'Shapes brand voice and go-to-market storytelling across campaigns.',
        quote: 'Stay curious',
        order: 2,
      },
      {
        name: 'Floyd Miles',
        role: 'Creative Director',
        photo:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
        bio: 'Shapes visual language, narrative arcs, and brand-led cinematic direction.',
        quote: 'Enjoy the process',
        order: 3,
      },
      {
        name: 'Arlene Bell',
        role: 'Executive Producer',
        photo:
          'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600',
        bio: 'Keeps productions on track from treatment to final delivery.',
        quote: 'Make it matter',
        order: 4,
      },
    ]);
    console.log('Seeded default team members');
  }

  if ((await Service.countDocuments()) === 0) {
    await Service.insertMany([
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
        description:
          'We are dedicated to transforming businesses by providing expert consulting services.',
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
    ]);
    console.log('Seeded default services');
  }

  if ((await Principle.countDocuments()) === 0) {
    await Principle.insertMany([
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
    ]);
    console.log('Seeded default principles');
  }

  if ((await Award.countDocuments()) === 0) {
    await Award.insertMany([
      {
        year: '2020',
        count: 'x1',
        badge: 'WINNER\nPRAGUE INTERNATIONAL\nFILM FESTIVAL\n2021',
        title: 'Most Reviewed - Video Production Companies',
        order: 1,
      },
      {
        year: '2020',
        count: 'x2',
        badge: 'WINNER\nNY MOVIE AWARDS\nFILM FESTIVAL\n2021',
        title: 'Top Creative Agencies',
        order: 2,
      },
      {
        year: '2021',
        count: 'x1',
        badge: 'WINNER\nHOLLYWOOD GOLD\nAWARDS 2021',
        title: 'Top Video Production Company',
        order: 3,
      },
      {
        year: '2023',
        count: 'x4',
        badge: 'WINNER\nDAS GOLDENE STADTTOR\nFILM FESTIVAL 2012',
        title: 'Top 5 Best of Media Websites',
        order: 4,
      },
      {
        year: '2024',
        count: 'x2',
        badge: 'WINNER\nCANNES FILM\nFESTIVAL 2024',
        title: 'Top 10 Best of Mobile App Design',
        order: 5,
      },
    ]);
    console.log('Seeded default awards');
  }

  if ((await Partner.countDocuments()) === 0) {
    const names = [
      'prime video',
      'film',
      'rumble',
      'dpgmedia',
      'cameo',
      'max',
      'dotmedia',
      'Blendle',
      'studio 45',
      'TiVo',
    ];
    await Partner.insertMany(names.map((name, i) => ({ name, order: i + 1 })));
    console.log('Seeded default partners');
  }

  if ((await Testimonial.countDocuments()) === 0) {
    await Testimonial.insertMany([
      {
        quote:
          "DUNE FRAME's hard-working and skilled team were a pleasure to work with on our product videos. Communication was excellent from pre to post-production.",
        name: 'James Moore',
        role: 'Digital Marketing Manager',
        order: 1,
      },
      {
        quote:
          'They turned a rough brief into a film that felt completely on-brand — sharp edit, strong story, zero drama.',
        name: 'Sara Chen',
        role: 'Brand Director',
        order: 2,
      },
      {
        quote:
          'From day one the team understood the tone we needed. Delivery was fast and the final cut exceeded expectations.',
        name: 'Marcus Lee',
        role: 'Head of Content',
        order: 3,
      },
      {
        quote:
          'A rare studio that balances creativity with process. Our campaign assets looked premium across every platform.',
        name: 'Priya Nair',
        role: 'Marketing Lead',
        order: 4,
      },
    ]);
    console.log('Seeded default testimonials');
  }

  if ((await Post.countDocuments()) === 0) {
    await Post.insertMany([
      {
        tag: 'Company Insights',
        title: 'Visual Storytelling for Brands: Turning Viewers into Loyal Customers',
        date: 'May 29, 2025',
        image:
          'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200',
        order: 1,
      },
      {
        tag: 'Company Insights',
        title: 'The ROI of Story: Measuring the Impact of Emotion-Driven Content',
        date: 'May 29, 2025',
        image:
          'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=800',
        order: 2,
      },
      {
        tag: 'Tips & Tricks',
        title: 'The Psychology Behind Great Video Ads: Design That Resonates',
        date: 'May 29, 2025',
        image:
          'https://images.pexels.com/photos/3379943/pexels-photo-3379943.jpeg?auto=compress&cs=tinysrgb&w=800',
        order: 3,
      },
    ]);
    console.log('Seeded default posts');
  }

  if (!(await SiteSettings.findOne({ key: 'main' }))) {
    await SiteSettings.create({
      key: 'main',
      email: 'hello@studio.example',
      phone: '+(084) 123 - 456 88',
      addressLine1: '401 Broadway, 24th Floor',
      addressLine2: 'Orchard View, London',
      hours: 'Mon–Fri, 10:00 – 18:00',
      clientsCount: '25k+',
      heroVideoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      heroPosterUrl:
        'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1800',
      introImages: [
        'https://images.pexels.com/photos/1209611/pexels-photo-1209611.jpeg?auto=compress&cs=tinysrgb&w=900',
        'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=900',
        'https://images.pexels.com/photos/3379943/pexels-photo-3379943.jpeg?auto=compress&cs=tinysrgb&w=900',
      ],
      partnerAvatars: [
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=120',
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=120',
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=120',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=120',
      ],
      socials: [
        { label: 'Facebook', href: 'https://facebook.com' },
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'YouTube', href: 'https://youtube.com' },
        { label: 'Twitter', href: 'https://twitter.com' },
      ],
    });
    console.log('Seeded default site settings');
  } else {
    await SiteSettings.updateOne(
      {
        key: 'main',
        $or: [{ heroVideoUrl: { $exists: false } }, { heroVideoUrl: '' }, { heroVideoUrl: null }],
      },
      {
        $set: {
          heroVideoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
          heroPosterUrl:
            'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1800',
        },
      }
    );

    const DEFAULT_INTRO = [
      'https://images.pexels.com/photos/1209611/pexels-photo-1209611.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/3379943/pexels-photo-3379943.jpeg?auto=compress&cs=tinysrgb&w=900',
    ];
    await SiteSettings.updateOne(
      {
        key: 'main',
        $or: [
          { introImages: { $exists: false } },
          { introImages: null },
          { introImages: { $size: 0 } },
        ],
      },
      { $set: { introImages: DEFAULT_INTRO } }
    );
  }
}

module.exports = seedDefaultsIfEmpty;
