import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLocation } from '../actions/updateLocation'
import '../style/Card.css'


 class Card extends PureComponent {

    handleClick = () => {
        let currentCard = this.props.currentCard[0]
        let deck =  this.props.deck
        console.log(deck);

        // Allow to play a card from hand if color or value match or if card is black
        if(this.props.color === currentCard.color || this.props.number === currentCard.value || this.props.color === "black"){
            this.props.updateLocation(this.props.id, this.props.location)

            if (this.props.plus === 2 || this.props.plus === 4){
                console.log("oh oh!");
                // let x = Math.floor(Math.random() * deck.length)
                // if(!x) return
                // this.props.drawCards(deck[x].id) 
            }
        }
      }

    classNames() {
        const { color} = this.props
        let classnames = ['Card']
        classnames.push(`fill-${color}`)
        return classnames.join(' ')
    }

    cardNumber(){
            const { number, plus } = this.props
            if (number) return this.props.number
            if (plus) return `+${plus}`
    }
    
    render() {
        return (
            <div className={this.classNames()} id={this.props.id} onClick={this.handleClick}  >
                <p style={{fontSize: "20px"}}>{this.cardNumber()} </p>
            </div>
        )
    }
    }

// Re-add state to component to be able to access the current card for game logic
 const mapStateToProps = ({cards}) => ({currentCard: cards.filter(card => card.location === "CurrentCard"), deck: cards.filter(card => card.location === "Deck") })
 export default connect(mapStateToProps, { updateLocation })(Card)

