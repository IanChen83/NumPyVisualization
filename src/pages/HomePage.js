import React from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';

const HomePage = () => (
    <Segment style={{ paddingLeft: 0, paddingRight: 0, textAlign: 'left' }} basic>
        <Header as="h1" style={{ margin: '15 auto', fontSize: '40px' }}>
            What is <span style={{ color: '#2185D0' }}>NumPy Visualization</span> ?
        </Header>
        <div style={{ fontSize: '25px' }}>A website to help you visualize what a numpy command actually dose.</div>
        <p></p>
        <div style={{ fontSize: '20px' }}>
	    		<p style={{ fontSize: '25px', fontWeight: 'bold' }}>Usage :</p>
	    		<p></p>
	    		<p>
	    			<Icon style={{marginLeft: 30}} color='blue' name='bomb' />
	    			Go to <span style={{ color: '#2185D0' }}>Visualization</span> page
	    		</p>
	    		<p>
	    			<Icon style={{marginLeft: 30}} color='blue' name='bomb' />
	    			Declare arrays by specifying <span style={{ color: '#2185D0' }}>name</span> and <span style={{ color: '#2185D0' }}>shape</span> on the right.<br />
	    			<span style={{marginLeft: 58}}>The specified array will appears in the table on left after you click <span style={{ color: '#2185D0' }}>add</span>.</span><br />
	    			<span style={{marginLeft: 58}}>You can click the <span style={{ color: '#2185D0' }}>'x'</span> icon to remove a array.</span><br />
	    		</p>
	    		<p>
	    			<Icon style={{marginLeft: 30}} color='blue' name='bomb' />
	    			Type the numpy command you want to visualize in the command line under the array table.
	    		</p>
	    		<p>
	    			<Icon style={{marginLeft: 30}} color='blue' name='bomb' />
	    			Click <span style={{ color: '#2185D0' }}>visualize</span>, and be ready for the visualization...
	    		</p>
	    	</div>
	    	<p></p>
	    	<div style={{ fontSize: '20px' }}>
	    		<p style={{ fontSize: '25px', fontWeight: 'bold' }}>Constraint :</p>
	    		<p></p>
	    		<p>
	    			<Icon style={{marginLeft: 30}} color='blue' name='bomb' />
	    			<span style={{ color: '#2185D0' }}>Array's Name:</span><br />
	    			<span style={{marginLeft: 58}}>Please specify in english.</span><br />
	    		</p>
	    		<p>
	    			<Icon style={{marginLeft: 30}} color='blue' name='bomb' />
	    			<span style={{ color: '#2185D0' }}>Array's Shape:</span><br />
	    			<span style={{marginLeft: 58}}>Please specify in the format ($1, $2, $3, ...)</span><br />
	    			<Icon style={{marginLeft: 52}} color='blue' name='pin' />
	    			<span style={{ fontSize: '17px'}}>Parentheses needed.</span><br />
	    			<Icon style={{marginLeft: 52}} color='blue' name='pin' />
	    			<span style={{ fontSize: '17px'}}>($number) should be a natural number.</span><br />
	    			<Icon style={{marginLeft: 52}} color='blue' name='pin' />
	    			<span style={{ fontSize: '17px'}}>Use comma to seperate each dimension.</span><br />
	    			<span style={{marginLeft: 58}}>For instance :</span><br />
	    			<span style={{marginLeft: 70, fontSize: '17px'}}>(2, 4) is correct</span><br />
	    			<span style={{marginLeft: 70, fontSize: '17px'}}>2; 4.0) is incorrect, which violate all three rules above.</span><br />
	    		</p>
	    	</div>
    </Segment>
);

export default HomePage;
