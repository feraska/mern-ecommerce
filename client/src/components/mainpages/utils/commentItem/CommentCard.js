import React, { Children, useEffect, useState } from 'react'
import Rating from '../rating/Rating'
import moment from 'moment'
const CommentCard = ({comment,children}) => {
    const {name,images} = comment.user[0]
    const [image,setImage] = useState('')
    useEffect(()=>{
        if(images){
            setImage(images)
        }
    },[image])
  return (
    <div className='comment_card'>
      <div className='comment_card_row'>
       {<h3>{name}</h3> }
        { <img className='myImg' src={images?image.url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAACHCAMAAADui70RAAAAMFBMVEXy8vK7v8LM0NO4vL/19fXu7+/s7OzJzdDp6enEyMvBxcff4OC+wsXW2dvj4+PS1dfLBHO+AAADgElEQVR4nO2ayRKkMAiGVVDj/v5vO3HpaWNHBYTMYfwPnqz6iiQsgWTZq1evXr169erVq1dPhIvSY7Nq7AavbqyydHxEN9U9/FVfd1USOlZDDpAH8viutIZjVeQH7kbvJ2P4EAev8M6Oja49BS/w2spw7C7By56PNuzpjjzDTRadQvbsQZ2NBYlswMaBSFZfcxzJZK9KE132DHLeKJKx5hitut23Dn2U2pJjyyRDrWU264ytbCWzseGScyh0zK7YRnu2CpkRTXZonbjCX28vlRWXrHee9+Vz8n2WjgqcApqWLH/QCpuNtYScw6Sw2dxQtkkhoJVCtEL64uVLXfR/abX0mDUKJ1wUR1VO+D/0a3E0e0yW1CgLWqNOKSXkvFUgS/O1BllWpejcdkvJZmuARe6lkjJnOX4drlAeLcKGyVYz2pvNNFqjJtzEjGi6l3tO+oJaEcwrxntVMqejoXXL/LLJMU2/a0e8hZj07EhrDs6kU4muv4FDU1n1Z8ubluFkw13h47nh0Nos9hfexXvi0Bj1owO4m2cuARb6yWqTD+ysHKemX5j+0zaDM5+57PFYVm70cj9jLuW5E7phoC0p/U8aeGzAry0lTvn06lUrnXV0W5FCqXrWWgqgULB8H0YIN7hPXod8eEwedn502+feVzPwLIVhFfbgb9LSIbFCIfc57H7C5pUlPyldHlpj1cHFhSb6uzB7R9MUnGQnPPldMgYpT+p+aCOGY2RvPhvOJ58PbX3EyAI6ZuP5/QTY/Zyrwhug8cFyeyWBmZsuZ8vAa2Nd2Pyh5800DcNULDH2+l9WM4nUSFgfSVB+pLOZwzwCm3rzFLarLtk0/xZOHG7YlLiG/B4CRaQrt7AneiPCzZf8MIDNvttu3niex767/Aob7xRdR1QDv/rqesltTvdHV6ec3SDj6WqqPVqCZ50OOtHwjC06zSMmEfTAPnMwmzgWKG62YTT56sRs2VSJiY5mbluf/ijm22Z5I1SsMJeOTbmK1Kf2nrXpJ6wIR5d8RQ5aKqNzOKATRLK/6OOKF6nIv2c80fmedTjjaeLJpiCqiEamUoWdiWSutaBD9xI+w5ApKE2rlOQwhaRI1TvtknbCgDILxh3asvKPoHd3AcFL0Ufo/RFPesDD4jBhGJ218y7Zqxe5du9l0rp1MOHmvkV4rG9M8XkLEipA93WRUM0aSf8Av38uAWW7mP0AAAAASUVORK5CYII='} alt={name}/> }
        

        {
            comment.rating!==0 && <Rating props ={comment}/>
        }
        
      </div>
      <span>{new Date(comment.createdAt).toLocaleString()}</span>
      <span>{moment(comment.createdAt).fromNow()}</span>
      <p dangerouslySetInnerHTML={{__html:comment.content}}></p>
      {children}
    </div>
  )
}

export default CommentCard
