import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { Toaster } from "react-hot-toast";
import Head from 'next/head';

import { recentCompetition, allCompetitions } from '../../library/recentComp';
import {eventDataFetch} from '../../library/recentCompData'
import {recentAchievements} from '../../library/recentAchievements'
import { iconLinkGetter } from '../../library/getIcon';

import teaJumping from '../../images/teaJumping.png'
import discordIcon from '../../images/discordIcon.svg'
import loginBackground from '../../images/loginBackground.png'
import vetionAndDragonBackground from '../../images/vetionAndDragonBackground.png'
import voidwakerBackground from '../../images/voidwakerBackground.png'
import dt2Background from '../../images/dt2Background.png'
import kermitSippingTea from '../../images/kermitSippingTea.png'

export default function Home() {
  const [clanName, setClanName] = useState('')
  const [rsName, setRsName] = useState('')
  const [competition, setCompetition] = useState('')

  console.log(eventDataFetch)
  

  // These are used to determin what to display for the Current event.
  const endingCompDate = Date.parse(eventDataFetch.endsAt)
  const startingDate = Date.parse(eventDataFetch.startsAt)
  const currentDate = Date.now()  

  const topThree = eventDataFetch.participations.slice(0,3).map((players) => {
    return players.player.username
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(process.env.WEBHOOK, 
      {
        "username": "Mint Tea",
        "channel_id": process.env.CHANNEL_ID,
        "embeds": [{
          "fields": [
            {"name": "RSN",
            "value": `${rsName}`},
            {"name": "Clan Name",
            "value": `${clanName}`},
            {"name": "Message",
            "value": `${competition}`}
          ]
        }]
      }
    ).catch((error)=> {
      console.log(error)
      toast.success(`Message did not send due to error: ${error}`)
    }).then(() => {
      setClanName('')
      setRsName('')
      setCompetition('')
    },
    toast.success('Message Sent!')
    )
  }

  const CurrentEvent = (title, text) => {
    if (currentDate < startingDate) {
      return(
        <div>
          <div className='row'>
            <div className='col-5 col-sm-6'>
              <p>The upcoming event is: {recentCompetition.title} ➡️</p>
            </div>
          </div>
          <div className='row'>
            <a title="Link to take you to the upcoming event page" className='text-decoration-none' href={`https://www.wiseoldman.net/competitions/${recentCompetition.id}`} style={{color: '#FCFF00'}}>
              <div className='col-12 col-md-4'>
                <a 
                  title="Takes you to the upcoming event page"
                  href={`https://www.wiseoldman.net/competitions/${recentCompetition.id}`}
                >
                  <Image
                    src={iconLinkGetter(recentCompetition)}
                    className='img-fluid rounded'
                    alt="boss or skill of the week"
                    width={377}
                    height={212}
                    style={{maxHeight: 300}}
                  />
                </a>
              </div>
            </a>
            <div className='col-12 col-md-8'>
              <p>We don&apos;t have a competition running right now but we have one starting soon! This competition is on {recentCompetition.metric}. Check out the competition on <a title="Link to take you to the upcoming event on wiseoldman" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' href={`https://www.wiseoldman.net/competitions/${recentCompetition.id}`} style={{color: 'white'}}>wiseoldman.net</a>. Once the competition has started, the scores will be updated periodically and the top three players will be posted here.</p>
            </div>
          </div>
        </div>
      )
    } else if (currentDate < endingCompDate) {
      return (
        <div>
          <div className='row'>
            <div className='col-5 col-sm-6'>
              <p><a title="Link to take you to the current event on wiseoldman" className='text-decoration-none' href={`https://www.wiseoldman.net/competitions/${recentCompetition.id}`} style={{color: '#FCFF00'}}>The current event is: {recentCompetition.title} ➡️</a></p>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-4'>
              <a 
                title="Takes you to the current event page"
                href={`https://www.wiseoldman.net/competitions/${recentCompetition.id}`}
              >
                <Image
                  src={iconLinkGetter(recentCompetition)}
                  className='img-fluid rounded'
                  alt="boss or skill of the week"
                  width={377}
                  height={212}
                  style={{maxHeight: 300}}
                />
              </a>
            </div>
            <div className='col-12 col-md-8'>
              <p>We have a competition running right now! This competition is on {recentCompetition.metric}. Check out the scores on <a title="Link to take you to the current event on wiseoldman" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' href={`https://www.wiseoldman.net/competitions/${recentCompetition.id}`} style={{color: 'white'}}>wiseoldman.net</a>. The current top three playres are &quot;{topThree[0]}&quot; in first, &quot;{topThree[1]}&quot; in second, and &quot;{topThree[2]}&quot; brining up third place.</p>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className='row'>
            <div className='col-5 col-sm-6'>
              <p><a title="Link to take you to the most recent event on wiseoldman" className='text-decoration-none' href={`https://www.wiseoldman.net/competitions/${recentCompetition.id}`} style={{color: '#FCFF00'}}>The previous event was: {recentCompetition.title} ➡️</a></p>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-4'>
              <a 
                title='Takes you to the page for the previous competition'
                href={`https://www.wiseoldman.net/competitions/${recentCompetition.id}`}
              >
                <Image
                  src={iconLinkGetter(recentCompetition)}
                  className='img-fluid rounded'
                  alt="boss or skill of the week"
                  width={377}
                  height={212}
                  style={{maxHeight: 300}}
                />
              </a>
            </div>
            <div className='col-12 col-md-8'>
              <p>We don&apos;t have a competition running right now. The most recent competition was {recentCompetition.title}. Check out the scores on <a title="Link to take you to the most recent event on wiseoldman" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' href={`https://www.wiseoldman.net/competitions/${recentCompetition.id}`} style={{color: 'white'}}>wiseoldman.net</a>. The top three players were &quot;{topThree[0]}&quot; in first, &quot;{topThree[1]}&quot; in second, and &quot;{topThree[2]}&quot; brining up third place.</p>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className='has-bg-img' style={{color: '#FCFF00', fontSize: 'larger'}}>
      <Head>
        <title>Official OSRS Clan: Tea</title>
      </Head>

      {/* Background Images */}
      <div className='position-absolute opacity-50 bg-image' style={{zIndex: -10}}>
        <Image
          className='bg-image img-fluid'
          src={loginBackground}
          alt="default login screen for old school runescape"
        />
        <Image
          className='bg-image img-fluid'
          src={vetionAndDragonBackground}
          alt="blender image of vetion and a dragon"
        />
        <Image
          className='bg-image img-fluid d-block d-xxl-none'
          src={voidwakerBackground}
          alt="blender image of a character holding a voidwaker"
        />
        <Image
          className='bg-image img-fluid d-block d-lg-none'
          src={dt2Background}
          alt="login backgroudn for desert treasure two release"
        />
        <Image
          className='bg-image img-fluid d-block d-md-none'
          src={loginBackground}
          alt="default login screen for old school runescape"
        />
        <Image
          className='bg-image img-fluid d-block d-md-none'
          src={vetionAndDragonBackground}
          alt="blender image of vetion and a dragon"
        />
        <Image
          className='bg-image img-fluid d-block d-md-none'
          src={voidwakerBackground}
          alt="blender image of a character holding a voidwaker"
        />
      </div>

      {/* Header */}
      <div className='container'>
        <div className='row p-2'>
          <div className='d-flex col-12 justify-content-center align-items-center rounded gap-3' style={{backgroundColor: '#4C554A', height: 80}}>
            <Image
                src={kermitSippingTea}
                width={55}
                height={50}
                className='rounded-circle pr-4'
                alt="Kermit the frog drinking tea"
              />
            <h1 className='text-center mt-1'>
              Tea: A Place For Mains, Irons, and Degens
            </h1>
          </div>
        </div>
      </div>
    
      {/* Bio */}
      <div className='container mt-4'>
        <div className='rounded p-3' style={{backgroundColor: '#4C554A'}}>
          <section>
            <h2>
              Who Are We?
            </h2>
            <div className='row align-items-center justify-content-center'>
              <div className='col-12 col-md-7'>
                <p>
                  We&apos;re a friendly bunch of about 100 active members. There is plenty of banter, but all in jest. We enjoy a wide range of content including skilling, bossing, and stuff just for fun. We have a decent spread of abilities with many folk interested god wars, raids, inferno, and more... We&apos;re currently undefeated in clan vs. clan bingo events (not really but don&apos;t tell anyone), and we host skill and boss of the week events within the clan on a biweekly basis.
                  <br />
                  <br />
                  Cheers from the clan leader, Harry!
                </p>
              </div>
              <div className='col-12 col-md-5'>
                <Image
                  src={teaJumping}
                  alt="clan members jumping in clan hall"
                  className='img-fluid rounded'
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    
      {/* Current Event */}
      <div className='container mt-4'>
        <div className='rounded p-3' style={{backgroundColor: '#4C554A'}}>
          <h2>Current Event</h2>
          <CurrentEvent />
        </div>
      </div>

      {/* Recent events */}
      <div className='container mt-4'>
        <div className='rounded p-3' style={{backgroundColor: '#4C554A'}}>
          <section>
            <h2>
              Recent Events
            </h2>
            <div className='d-flex flex-row flex-nowrap overflow-auto gap-4'>
              {allCompetitions.slice(1,9).map((events) => {
                return(
                    <div 
                      key={events.id}
                      className='mb-2'
                    >
                      <a 
                        title={`Link to the competition of ${events.title}`}      className='col-4 rounded link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' 
                        href={`https://www.wiseoldman.net/competitions/${events.id}`} 
                        style={{minWidth: 250}}
                      >
                      <p style={{color: 'white'}}>{events.title} ➡️</p>
                      <div 
                        className='bg-light text-center rounded p-2 align-items-center' 
                        style={{width: 200, height: 200}}
                      >
                        <Image
                          src={iconLinkGetter(events)}
                          className='img-fluid rounded col-12'
                          alt="boss or skill of the week"
                          width={377}
                          height={212}
                          style={{maxHeight: 150, maxWidth: 150}}
                        />
                      </div>
                    </a>
                  </div>
                )
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Discord Invite */}
      <div className='container mt-5'>
        <div className='rounded p-3' style={{backgroundColor: '#4C554A'}}>
          <section>
            <div className='row justify-content-between'>
              <div  className='col-12 col-md-8'>
                <h2>
                  Come Join Us!
                </h2>
                <p>
                  The only requirement for you to join is that you respect the other members and behave yourself. We&apos;re currently looking for new members! If you&apos;re looking for a great community to join, you can find us by searching for &ldquo;Tea&ldquo; in game in the clan tab (green smiley face tab). To join the discord, just <a title="clan's discord on discord" className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="https://discord.gg/tea-stain" style={{color: "white"}}>click here</a> or on the Discord Image.
                </p>
              </div>
              <a title="Link to the clan discord" href="https://discord.gg/tea-stain" className='col-12 col-md-2' style={{width: 200}}>
                <Image src={discordIcon} className='img-fluid text-cetner' alt="Discord Icon"/>
              </a>
            </div>
          </section>
        </div>
      </div>
      
      {/* Competition Form */}
      <div className='container mt-4'>
        <div className='rounded p-3' style={{backgroundColor: '#4C554A'}}>
          <section>
            <h2>Looking For Competition?</h2>
            <div className='row'>
              <div className='col-12 col-lg-6'>
                <p>We do Clan vs. Clan competitions! If you have a clan and are looking for some fun competition, fill out the form and let us know what you&apos;re looking for.</p>
              </div>
            </div>
            <form method="post" onSubmit={handleSubmit}>
              <div className='row'>
                <div className='col-12 col-lg-3'>
                  <div className='col-12 col-lg-6'>
                    <label>Clan Name:
                      <div className='mb-3'>
                        <input className='border border-success border-3' type='text' value={clanName} onChange={e => setClanName(e.target.value)} required></input>
                      </div>
                    </label>
                  </div>
                  <div className='col-12 col-lg-6'>
                    <label>Your RSN or Discord Name: 
                      <div className='mb-2'>
                        <input className='border border-success border-3' type='text' name='rsn' value={rsName} onChange={e => setRsName(e.target.value)} required></input>
                      </div>
                    </label>
                  </div>
                </div>
                <div className='col-12 col-lg-9'>
                  <label className='w-100 h-100'>
                    <p className='pb-0 mb-0'>Tell us about your clan and competition:</p>
                    <textarea className='border border-success border-3 w-100 h-75' name='message' value={competition} onChange={e => setCompetition(e.target.value)} required/>
                  </label>
                </div>
                <div className='col-3 h-100 mt-4'>
                  <Toaster position="bottom-center" />
                  <button className='w-100 h-50 btn btn-primary' type='submit'><p className='h4 pt-2'>Submit!</p></button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>

      {/* Tools Section */}
      {/* <div className='container mt-4 carousel'>
        <h2>Tools</h2>
        <div className='d-flex flex-row flex-nowrap overflow-auto gap-4'>
        <div className='col-4 bg-image card' style={{width: 300, minHeight: 270}}>
            <Image
              src={manInFrontOfDragon}
              className='w-100'
              alt='man with pickaxe standing infront of a dragon'
            />
            <div className="card-img-overlay text-center">
              <h4 className='text-danger'>Custom heading</h4>
            </div>
          </div>
          <div className='col-4 bg-image card' style={{width: 300, minHeight: 270}}>
            <Image
              src={manInFrontOfDragon}
              className='w-100'
              alt='man with pickaxe standing infront of a dragon'
            />
            <div className="card-img-overlay text-center">
              <h4 className='text-danger'>Custom heading</h4>
            </div>
          </div>
          <div className='col-4 bg-image card' style={{width: 300, minHeight: 270}}>
            <Image
              src={manInFrontOfDragon}
              className='w-100'
              alt='man with pickaxe standing infront of a dragon'
            />
            <div className="card-img-overlay text-center">
              <h4 className='text-danger'>Custom heading</h4>
            </div>
          </div>
        </div>
      </div> */}

      {/* Recent Achievements */}
      <div className='container mt-4 carousel'>
        <div className='rounded p-3' style={{backgroundColor: '#4C554A'}}>
          <section>
            <h2>Recent Achievements</h2>
            <div className='d-flex flex-row flex-nowrap overflow-auto gap-3 align-items-center'>
              {recentAchievements.slice(0,5).map((achievement) => {
                return(
                  <a key={achievement.name} title="Link to the clan achievements on wiseoldman.net" className='link-underline-light link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover mb-2' href="https://www.wiseoldman.net/groups/651/achievements">
                    <div className='col-3 rounded p-3 text-center' style={{width: 250, height: 150, backgroundColor: '#434A28', color: 'white'}}>
                      <h4>{achievement.player.username}</h4>
                      <p>{achievement.createdAt.split('T', 1)}</p>
                      <p>{achievement.name}</p>
                    </div>
                  </a>
                )
              })}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <div className='container my-5'>
        <div className='row rounded col-10 mx-auto' style={{backgroundColor: '#4C554A'}}>
          <div className='text-center p-3 mt-1'>
            <h2>We&apos;ll See You In Game!</h2>
          </div>
        </div>
      </div>
    
      {/* Site by Lucas Minter */}
      <p>
        <a title="Link to Lucas Minter's github" className='text-white text-decoration-none rounded link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover p-1' style={{backgroundColor: '#6b7368'}} href="https://github.com/lsminter">
          Site by Lucas Minter
        </a>
      </p>
    </div>    
  )
}