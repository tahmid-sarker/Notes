"use client"
import { useRouter } from 'next/navigation'

export default function Services() {
  const router = useRouter();
  const data = [
    {id: 1, name: 'Web Development'},
    {id: 2, name: 'Mobile App Development'},
    {id: 3, name: 'UI/UX Design'},
  ];

  return (
    <section>
        <p>This is the Services Page.</p>
        {data.map(service => (
          <div key={service.id} className='my-4 p-4 border border-gray-300 rounded'>
            <h2 className='text-xl font-semibold'>{service.name}</h2>
            <button type='button' className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
              onClick={() => router.push(`/services/${service.id}`)}>
              View Details
            </button>
          </div>
        ))}
    </section>
  )
}