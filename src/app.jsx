import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import shortId from 'shortid'
import POLLS from './components/data/polls'
import MainContent from './components/main-component'
import Sidebar from './components/sidebar'

class App extends React.Component {
    state = {
        polls: [],
        selectedPoll: {},
        searchTerm: ''
    }

    componentDidMount() {
        this.setState({ polls: POLLS })
    }
    
    addNewPoll = poll => {
        poll.id = shortId.generate()
        poll.created = new Date()
        poll.totalVote = 0
        poll.opinion = []

        this.setState({
            polls: this.state.polls.concat(poll)
        })
    }
    updatePoll = updatePoll => {
        const polls = [...this.state.polls]
        const poll = polls.find(p => p.id === updatePoll.id)

        poll.title = updatePoll.title
        poll.description = updatePoll.description
        poll.option = updatePoll.opinion

        this.setState({ polls })
    }
    deletePoll = pollId => {
        const polls = this.state.polls.filter(p => p.id === pollId)
        this.setState({ polls, selectedPoll: {} })
    }

    selectPoll = pollId => {
        const poll = this.state.polls.find(p => p.id === pollId)
        this.setState({ selectPoll: poll })
    }
    handleSearch = searchTerm => {}

    render() {
        return(
            <Container className='my-5'>
                <Row>
                    <Col md={4}>
                        <Sidebar
                            polls={this.state.polls}
                            searchTerm={this.state.searchTerm}
                            handleSearch={this.handleSearch}
                            selectPoll={this.selectPoll}
                        />
                    </Col>
                    <Col md={8}>
                        <MainContent />
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default App