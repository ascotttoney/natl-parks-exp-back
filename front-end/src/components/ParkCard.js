import React from 'react'
import { GiDirectionSign } from 'react-icons/gi'
import { Button } from 'react-bootstrap'


export default class ParkCard extends React.PureComponent {
  render() {
    const img = this.props.park.imgs[Math.floor(Math.random() * this.props.park.imgs.length)]
    return (
      <div className="m-1 card" style={{ width: '25rem' }} onClick={e => this.props.showPark(this.props.park)}>
        <img className="p-2 card-img-bottom" style={{ maxHeight: '35rem', borderRadius: "10px" }} src={img.url} alt={img.caption} />
        <div className="card-body">
          <h5 className="card-title"><GiDirectionSign /> {this.props.park.name}</h5>
        </div>
        <Button type="button" className="btn btn-success m-1" >Log Past Trip</Button>
        <Button type="button" className="btn btn-warning m-1" >Plan New Trip</Button>
      </div>
    )
  }
}
