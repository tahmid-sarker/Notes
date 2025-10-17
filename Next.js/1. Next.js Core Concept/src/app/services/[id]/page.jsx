import React from 'react'

export default async function ServiceDetails({ params }) {
  const data = [
    { id: 1, name: 'Web Development', description: 'We offer cutting-edge web development services using the latest technologies.' },
    { id: 2, name: 'Mobile App Development', description: 'Our team creates user-friendly mobile applications for both Android and iOS platforms.' },
    { id: 3, name: 'UI/UX Design', description: 'We design intuitive and engaging user interfaces to enhance user experience.' },
  ];
  // const id = params.id; This is same as below line using destructuring
  const { id } = await params;
  const singleData = data.find(service => service.id.toString() === id);
  if (singleData) {
    return (
      <section>
        <h1 className='text-2xl font-bold mb-4'>Service Details</h1>
        <h2 className='text-lg font-medium'>Service ID: {id}</h2>
        <h3 className='text-xl font-semibold'>{singleData?.name}</h3>
        <p className='mt-2'>{singleData?.description}</p>
      </section>
    )
  } else {
    return <p>Service not found.</p>
  }
}