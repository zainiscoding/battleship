(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{14:function(t,e,r){},15:function(t,e,r){},16:function(t,e,r){"use strict";r.r(e);var a=r(0),i=r(1),n=r.n(i),o=r(8),c=r.n(o),s=r(4),p=r(3),h=r(2),l=function(t,e,r,a,i){var n=[];if("horizontal"===a)for(var o=0;o<r;o++){var c={x:t+o,y:e,hit:!1};n.push(c)}else for(var s=0;s<r;s++){var p={x:t,y:e-s,hit:!1};n.push(p)}return null!==t&&t+r>10&&"horizontal"===a||e-r<-1&&"vertical"===a?null:{getShipLength:function(){return r},getOrientation:function(){return a},positions:n,hit:function(t,e){n.forEach((function(r){r.x===t&&r.y===e&&n.splice(n.indexOf(r),1,{x:r.x,y:r.y,hit:!0})}))},isSunk:function(){return n.every((function(t){return t.hit}))},placed:!1,getShipNumber:function(){return i}}},u=function(){var t=[],e=[],r=0;!function(){for(var e=function(e){var a=e;var i={empty:!0,x:e>9?a=e%10:a,y:(e%10===0&&e>9&&(r+=1),9-r)};t.push(i)},a=0;a<100;a++)e(a)}();return{gameBoardArray:t,playerShipPositions:e,placeShip:function(r,a,i,n,o){var c=l(r,a,i,n,o);if(null!==c){var s=Object(p.a)(c.positions),h=!1;return e.forEach((function(t){if(s.some((function(e){return e.x===t.x&&e.y===t.y})))return h=!0})),h?c:(s.forEach((function(r){t.forEach((function(a){var i={empty:!1,ship:c};r.x===a.x&&r.y===a.y&&(i.x=a.x,i.y=a.y,t.splice(t.indexOf(a),1,i),e.push(r))}))})),!0)}},removeShip:function(r,a){if(t[a].ship){var i=t[a].ship.positions;t.forEach((function(a){i.forEach((function(i){var n={empty:!0,x:i.x,y:i.y};a.ship&&a.ship.getShipNumber()===r&&t.splice(t.indexOf(a),1,n),e.forEach((function(t){t===i&&e.splice(e.indexOf(e,1))}))}))}))}},receiveAttack:function(e,r,a){var i=t[e],n={empty:!1,hit:!0,ship:t[e].ship},o={empty:!1,sunk:!0,hit:!0,ship:t[e].ship};if(!i.ship)return t.splice(e,1,{empty:!1,miss:!0,hit:!1});i.ship.hit(r,a),i.ship.isSunk()?t.forEach((function(e){e.ship===i.ship&&t.splice(t.indexOf(e),1,o)})):t.splice(e,1,n)},listShips:function(){t.forEach((function(t){if(t.ship)return t}))}}},d=function(t){var e=u(),r=[];if("Player"===t){var a=l(void 0,void 0,5,"horizontal"),i=l(void 0,void 0,4,"horizontal"),n=l(void 0,void 0,3,"horizontal"),o=l(void 0,void 0,3,"horizontal"),c=l(void 0,void 0,2,"horizontal");r.push(a,i,n,o,c)}return{getName:function(){return t},playerBoard:e,makePlay:function(t,e,r,a){var i=Math.floor(100*Math.random());void 0!==e?t.placeShip(e,r,a):t.receiveAttack(i)},removeShip:function(t){var e=r.filter((function(e){return e!==r[t]}));return r=Object(p.a)(e)},playerShips:r,rotateHorizontalShip:function(t){var e=l(r[t].x,r[t].y,r[t].getShipLength(),"vertical");return r.splice(t,1,e)},rotateVerticalShip:function(t){var e=l(r[t].x,r[t].y,r[t].getShipLength(),"horizontal");return r.splice(t,1,e)}}},f=function(t){return Object(a.jsx)("div",{id:"board-wrapper__player-board-wrapper",children:t.player.playerBoard.gameBoardArray.map((function(e,r){return e.ship&&e.sunk?Object(a.jsx)("div",{className:"friendly-ship-block",id:r,"data-x":t.setX(r),"data-y":t.setY(r),children:"Sunk Ship"},r):e.hit?Object(a.jsx)("div",{className:"friendly-ship-block",id:r,"data-x":t.setX(r),"data-y":t.setY(r),children:"Hit"},r):e.ship&&!e.hit?Object(a.jsx)("div",{className:"friendly-ship-block",id:r,"data-x":t.setX(r),"data-y":t.setY(r),"data-shipnumber":e.ship.getShipNumber(),onClick:t.removeShipFromBoard,children:"Ship"},r):e.miss?Object(a.jsx)("div",{className:"miss-block",children:"Miss"},r):Object(a.jsx)(a.Fragment,{children:!e.ship&&Object(a.jsx)("div",{className:"empty-block",id:r,"data-x":t.setX(r),"data-y":t.setY(r),onClick:t.placeChosenShip},r)})}))})},b=function(t){return Object(a.jsx)("div",{id:"board-wrapper__computer-board-wrapper",children:t.computerBoardArray.map((function(e,r){return e.ship&&e.sunk?Object(a.jsx)("div",{className:"enemy-ship-block",id:r,"data-x":t.setX(r),"data-y":t.setY(r),children:"Sunk Ship"},r):e.hit?Object(a.jsx)("div",{className:"enemy-ship-block",id:r,"data-x":t.setX(r),"data-y":t.setY(r),children:"Hit"},r):e.ship&&!e.hit?Object(a.jsx)("div",{className:"enemy-ship-block",id:r,"data-x":t.setX(r),"data-y":t.setY(r),onClick:t.playerAttackHandler,children:"Ship"},r):e.miss?Object(a.jsx)("div",{className:"miss-block",children:"Miss"},r):Object(a.jsx)(a.Fragment,{children:!e.ship&&Object(a.jsx)("div",{className:"empty-block",id:r,"data-x":t.setX(r),"data-y":t.setY(r),onClick:t.playerAttackHandler},r)})}))})},j=function(t){return Object(a.jsx)("div",{id:"player-ships-wrapper",children:t.player.playerShips.map((function(e,r){return Object(a.jsx)(a.Fragment,{children:!1===e.placed&&Object(a.jsxs)("div",{className:"player-ships-wrapper__ship--"+e.getOrientation(),"data-shipnumber":r,"data-length":e.getShipLength(),"data-orientation":e.getOrientation(),onClick:t.chooseShip,children:[Object(a.jsx)("button",{onClick:t.rotateShip,children:"Rotate"}),Object(a.jsx)(a.Fragment,{children:e.positions.map((function(e,r){return Object(a.jsxs)("div",{className:"player-ship-block",id:r,"data-x":t.setX(r),"data-y":t.setY(r),children:["position ",r]},r)}))})]},r)})}))})},y=function(t){return Object(a.jsx)(j,{player:t.player,setX:t.setX,setY:t.setY,chooseShip:t.chooseShip,rotateShip:t.rotateShip,mouseMove:t.mouseMove})},m=function(t){return Object(a.jsx)("div",{id:"error-wrapper",children:"Unable to place ship. Check for collision and available space."})},v=function(t){function e(t){return t>9?t%10:t}function r(t){return t>89?0:9-Math.floor(t/10)}return Object(a.jsxs)("div",{id:"game-wrapper",children:[Object(a.jsxs)("div",{id:"board-wrapper",children:[Object(a.jsx)(f,{player:t.player,setX:e,setY:r,placeChosenShip:t.placeChosenShip,removeShipFromBoard:t.removeShipFromBoard}),Object(a.jsx)(b,{computerBoardArray:t.computer.playerBoard.gameBoardArray,setX:e,setY:r,playerAttackHandler:t.playerAttackHandler,placeChosenShip:t.placeChosenShip})]}),t.preparing&&Object(a.jsxs)(a.Fragment,{children:[t.placementError&&Object(a.jsx)(m,{}),Object(a.jsx)(y,{player:t.player,setX:e,setY:r,chooseShip:t.chooseShip,rotateShip:t.rotateShip}),Object(a.jsx)("button",{onClick:t.startGame,children:"Start game"})]}),t.gameOver&&Object(a.jsxs)(a.Fragment,{children:[t.playerWins&&Object(a.jsx)("div",{children:"You win!"}),!t.playerWins&&Object(a.jsx)("div",{children:"You lose!"}),Object(a.jsx)("button",{onClick:t.restartGame,children:"Restart"})]})]})},O=function(t){var e=Object(i.useState)(d("Player")),r=Object(h.a)(e,2),n=r[0],o=r[1],c=Object(i.useState)(d("Computer")),l=Object(h.a)(c,2),u=l[0],f=l[1],b=Object(i.useState)(!0),j=Object(h.a)(b,2),y=j[0],m=j[1],O=Object(i.useState)([]),x=Object(h.a)(O,2),S=x[0],g=x[1],k=Object(i.useState)(!1),B=Object(h.a)(k,2),A=B[0],E=B[1],N=Object(i.useState)(!0),C=Object(h.a)(N,2),M=C[0],Y=C[1],X=Object(i.useState)(!1),z=Object(h.a)(X,2),w=z[0],I=z[1],F=Object(i.useState)(),H=Object(h.a)(F,2),L=H[0],P=H[1],_=Object(i.useState)(0),G=Object(h.a)(_,2),W=G[0],J=G[1],R=Object(i.useState)(!1),V=Object(h.a)(R,2),T=V[0],U=V[1],q=Object(i.useState)(!1),D=Object(h.a)(q,2),K=D[0],Q=D[1],Z=Object(i.useState)(),$=Object(h.a)(Z,2),tt=$[0],et=$[1];return Object(i.useEffect)((function(){y||setTimeout((function(){!function(){var t=0;function e(){return t=Math.floor(100*Math.random())}for(g([].concat(Object(p.a)(S),[e()]));S.includes(t)&&S.length<100;)g([].concat(Object(p.a)(S),[e()]));o((function(e){return e.playerBoard.receiveAttack(t,parseInt(e.playerBoard.gameBoardArray[t].x),parseInt(e.playerBoard.gameBoardArray[t].y)),Object(s.a)({},e)})),m(!0)}()}),0)}),[y]),Object(i.useEffect)((function(){if(!M){var t=[],e=[];u.playerBoard.gameBoardArray.forEach((function(e){e.ship&&!t.includes(e.ship)&&t.push(e.ship)})),n.playerBoard.gameBoardArray.forEach((function(t){t.ship&&!e.includes(t.ship)&&e.push(t.ship)})),t.every((function(t){return t.isSunk()}))&&(et(!0),E(!0)),e.every((function(t){return t.isSunk()}))&&(et(!1),E(!0))}}),[u,M,n.playerBoard.gameBoardArray]),Object(a.jsx)(v,{player:n,computer:u,playerAttackHandler:function(t){y&&!M&&f((function(e){return e.playerBoard.receiveAttack(t.target.id,parseInt(t.target.getAttribute("data-x")),parseInt(t.target.getAttribute("data-y"))),m(!1),Object(s.a)({},e)}))},chooseShip:function(t){var e={shipLength:parseInt(t.target.getAttribute("data-length")),orientation:t.target.getAttribute("data-orientation")};I(!0),J(parseInt(t.target.getAttribute("data-shipnumber"))),P(e)},placeChosenShip:function(t){w&&o((function(e){var r=parseInt(t.target.getAttribute("data-x")),a=parseInt(t.target.getAttribute("data-y"));return!0===e.playerBoard.placeShip(r,a,L.shipLength,L.orientation,W)?(n.playerShips[W].placed=!0,U(!1),I(!1)):U(!0),Object(s.a)({},e)}))},rotateShip:function(t){if(t.stopPropagation(),!w){var e=t.target.parentNode.getAttribute("data-shipnumber"),r=t.target.parentNode.getAttribute("data-orientation");o("horizontal"===r?function(t){return t.rotateHorizontalShip(e),Object(s.a)({},t)}:function(t){return t.rotateVerticalShip(e),Object(s.a)({},t)})}},preparing:M,startGame:function(){var t=[];!function(){var t,e,r,a,i;function n(){return Math.floor(10*Math.random())}function o(){return Math.floor(10*Math.random())}function c(t){for(var e={x:n(),y:o(),length:t,orientation:Math.floor(10*Math.random())%2===0?"horizontal":"vertical"};null!==e.x&&e.x+t>10&&"horizontal"===e.orientation||e.y-t<-1&&"vertical"===e.orientation||void 0===e;)e.x=n(),e.y=o();return e}var h=c(2),l=c(3),d=c(3),b=c(4),j=c(5),y=u;function m(t){return[t.x,t.y,t.length,t.orientation]}[(t=y.playerBoard).placeShip.apply(t,Object(p.a)(m(h))),(e=y.playerBoard).placeShip.apply(e,Object(p.a)(m(l))),(r=y.playerBoard).placeShip.apply(r,Object(p.a)(m(d))),(a=y.playerBoard).placeShip.apply(a,Object(p.a)(m(b))),(i=y.playerBoard).placeShip.apply(i,Object(p.a)(m(j)))].forEach((function(t){for(;!0!==t;){var e=c(t.getShipLength());t=y.playerBoard.placeShip(e.x,e.y,e.length,e.orientation),f(y)}})),f(y),f((function(t){return Object(s.a)({},t)}))}(),n.playerBoard.gameBoardArray.forEach((function(e){e.ship&&!t.includes(e.ship)&&t.push(e.ship)})),M&&5===t.length?(Y(!1),Q(!1)):Q(!0)},restartGame:function(){Y(!0),m(!0),g([]),E(!1),et(""),o(d("Player")),f(d("Computer"))},removeShipFromBoard:function(t){M&&!w&&o((function(e){var r=parseInt(t.target.getAttribute("data-shipnumber")),a=parseInt(t.target.id);return n.playerShips[r].placed=!1,n.playerBoard.removeShip(r,a),Object(s.a)({},e)}))},placementError:T,placeAllShipsError:K,playerWins:tt,gameOver:A})};r(14),r(15);var x=function(){return Object(a.jsx)("div",{className:"App",children:Object(a.jsx)(O,{})})};c.a.render(Object(a.jsx)(n.a.StrictMode,{children:Object(a.jsx)(x,{})}),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.d456f133.chunk.js.map