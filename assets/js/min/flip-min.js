!function(t){var e=t.createClass({displayName:"Flip",isFlipped:function(){return this.state.flipX?!this.state.flipY:this.state.flipY},rotate3d:function(t){var e=document.getElementById("game-board"),i,s;"x"===t?(i=this.state.flipX?0:"180deg",s=this.state.flipY?"180deg":0):(i=this.state.flipX?"180deg":0,s=this.state.flipY?0:"180deg"),e.classList.toggle("flipped"),e.style.transform="rotateX("+i+") rotateY("+s+")",e.style.webkitTransform="rotateX("+i+") rotateY("+s+")"},flip:function(t){var e=document.getElementById("player"),i=this.state.playerPosition,s="x"===t?this.state.height:this.state.width,a="x"===t?"y":"x",n="x"===t,r="y"===t;e.classList.toggle("flip"),i[a]=s-i[a]-1,e.classList.add("no-background"),this.rotate3d(t),e.classList.remove("no-background"),this.setState({playerPosition:i,flipX:n?!this.state.flipX:this.state.flipX,flipY:r?!this.state.flipY:this.state.flipY}),setTimeout(function(){this.setState({win:this.checkBoard(i),flipped:this.isFlipped()}),this.performTileEvents(i)}.bind(this),400)},isValidMove:function(t,e,i){function s(t){return 1===t.x?r?"R":"r":-1===t.x?r?"L":"l":1===t.y?r?"B":"b":-1===t.y?r?"T":"t":void 0}function a(t,e){var i=n[t.y][t.x].split(""),a=s(e);return-1!==i.indexOf(a)}var n=this.state.tiles,r=this.isFlipped();if(this.state.flipX&&(i.y*=-1),this.state.flipY&&(i.x*=-1),e.x<0||e.x>this.state.width-1||e.y<0||e.y>this.state.height-1)return!1;var o=a(t,i)||a(e,{x:-i.x,y:-i.y});return o?!1:!0},performTileEvents:function(t){var e=this.state.tiles,i=e[t.y][t.x].split("");this.state.flipped?-1!==i.indexOf("X")||-1!==i.indexOf("Y")&&this.flip("y"):-1!==i.indexOf("x")?this.flip("x"):-1!==i.indexOf("y")&&this.flip("y")},move:function(t){var e=this.state.playerPosition,i=this.state.flipX?-1:1,s=this.state.flipY?-1:1,a={x:e.x+t.x*s,y:e.y+t.y*i};if(this.isValidMove(e,a,t)){var n=document.getElementById("player"),r=this.state.flipX?this.state.height-a.y-1:a.y,o=this.state.flipY?this.state.width-a.x-1:a.x,l=n.offsetWidth,h="translate3d("+o*l+"px,"+r*l+"px,0)";n.style.transform=h,n.style.webkitTransform=h,this.setState({playerPosition:a,win:this.checkBoard(a)}),this.performTileEvents(a)}},checkBoard:function(t){var e=this.state.goalPosition;return this.isFlipped()||t.x!==e.x||t.y!==e.y?!1:!0},getPlayerOffset:function(){var t=document.getElementById("game-board"),e=parseInt(window.getComputedStyle(t).borderBottomWidth,10);return{top:t.offsetTop+e,left:t.offsetLeft+e}},getDimensions:function(){var t=document.getElementById("player").offsetWidth;return{width:t*this.state.width+"px",height:t*this.state.height+"px"}},initialMap:function(){var t=[["","","r","",""],["","Y","r","",""],["","","r","",""],["","","r","","E"],["x","","r","",""]];return{level:1,board:t,height:t.length,width:t[0].length,startPosition:{x:0,y:0},goalPosition:{x:4,y:3}}},restartGame:function(){var t=document.getElementById("game-board"),e=document.getElementById("player"),i=e.offsetWidth,s="translate3d("+this.state.startPosition.x*i+"px,"+this.state.startPosition.y*i+"px,0)";e.style.transform=s,e.style.webkitTransform=s,e.classList.remove("flip"),t.style.transform="",t.style.webkitTransform="",t.classList.remove("flipped"),this.setState(this.getInitialState()),this.setState({boardDimensions:this.getDimensions()}),this.setState({playerOffset:this.getPlayerOffset()})},handleKeyPress:function(t){var e=t.keyCode;-1!==[32,13,37,38,39,40].indexOf(e)&&t.preventDefault(),this.state.win||(37===e?this.move({x:-1,y:0}):38===e?this.move({x:0,y:-1}):39===e?this.move({x:1,y:0}):40===e&&this.move({x:0,y:1}))},componentDidMount:function(){window.addEventListener("keydown",this.handleKeyPress),this.setState({boardDimensions:this.getDimensions()}),this.setState({playerOffset:this.getPlayerOffset()})},getInitialState:function(){var t=this.initialMap();return{height:t.height,width:t.width,boardDimensions:{width:0,height:0},playerOffset:{top:0,left:0},tiles:t.board,startPosition:t.startPosition,playerPosition:{x:t.startPosition.x,y:t.startPosition.y},goalPosition:t.goalPosition,flipX:!1,flipY:!1,flipped:!1,win:!1}},render:function(){var e=this.state.tiles.reduce(function(t,e){return t.concat(e)}),n=this.state.win?"You win!":"Get to the flower.";return t.DOM.div(null,t.DOM.div({id:"game-board",style:this.state.boardDimensions},e.map(function(t,e){return i({tileText:t,key:e})},this)),",",s({boardOffset:this.state.playerOffset}),a({winClass:this.state.win?"button win":"button",status:n,restart:this.restartGame}))}}),i=t.createClass({displayName:"Tile",getTileClassOf:function(t){var e="tile";if(!t)return e;var i={E:" exit",x:" flip-x",y:" flip-y",b:" wall-bottom",r:" wall-right",X:" back-flip-x",Y:" back-flip-y",B:" back-wall-bottom",R:" back-wall-right"};return t=t.split(""),t.forEach(function(t){e+=i[t]||""}),e},render:function(){return t.DOM.div({className:this.getTileClassOf(this.props.tileText)})}}),s=t.createClass({displayName:"Player",render:function(){return t.DOM.div({className:"tile",id:"player",style:this.props.boardOffset})}}),a=t.createClass({displayName:"Menu",clickHandler:function(){this.props.restart()},render:function(){return t.DOM.div({id:"menu"},t.DOM.h3({id:"subtitle"},this.props.status),t.DOM.a({className:this.props.winClass,onClick:this.clickHandler},"Restart"))}});t.renderComponent(e(null),document.getElementById("game-container"))}(React);