import React from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'



export default function HomePage({ events }) {
  console.log(events)
  return (
    <Layout>
    <h1>Upcomming Events</h1>
    {events.length === 0 && <h3>No events to show</h3>}
    {events.map((evt) => (
      <EventItem key={evt.id} evt={evt} />
    ))}

    {events.length > 0 && (
      <Link legacyBehavior href='/events'>
        <a className='btn-secondary'>View all events</a>
      </Link>
    )}
    </Layout>

  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`) 
  const events = await res.json()

  return {
    props: {events:events.slice(0, 3)},
    revalidate: 1,
  }
}
