const canvas = document.getElementById('can')

canvas.width = 800
canvas.height = 680


const ctx = canvas.getContext('2d')


class Bubble {
    constructor(color, x = 100, y, radius) {
        this.color = color
        this.bubbleX = x
        this.bubbleY = y
        this.radius = radius
        this.arrowX = canvas.width - 200
        this.arrowY = this.bubbleY
        this.animate = false
    }

    drawBubble(ctx) {
        ctx.fillStyle = this.color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(this.bubbleX, this.bubbleY, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
    }

    drawArrow(ctx) {
        const x = this.arrowX
        const y = this.arrowY
        const size = this.radius
        ctx.fillStyle = 'black'
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + size, y - size)
        ctx.lineTo(x + size, y - (size / 2))
        ctx.lineTo(x + (size * 3), y - (size / 2))
        ctx.lineTo(x + (size * 3), y + (size / 2))
        ctx.lineTo(x + size, y + (size / 2))
        ctx.lineTo(x + size, y + size)
        ctx.lineTo(x, y)
        ctx.fill()

    }
    updateArrow() {
        if(this.animate){
            if(this.arrowX != this.bubbleX + this.radius){
                this.arrowX -= 1
            }else{
                this.color = 'grey'
            }
        }
        
    }
}







const bubbles = []
const color = ['yellow', 'blue','red', 'green' ]
const gap = 50, radius = 50

createBubbles(color,gap,radius,bubbles)

function createBubbles(color,gap,radius, bubbles){
    let  y = (radius*2)+gap
    for(let i=0;i<color.length;i++){
        bubbles.push(new Bubble(color[i],undefined,y,radius))
        y+=(radius*2)+gap
        bubbles[i].drawBubble(ctx)
        bubbles[i].drawArrow(ctx)
    }
}

//this portion will deal with animation

animate()


function animate(){

    ctx.clearRect(0,0,canvas.width, canvas.height)
    bubbles.forEach(bubble=>{
        bubble.drawBubble(ctx)    
        bubble.updateArrow(ctx)
        bubble.drawArrow(ctx)

    })

    requestAnimationFrame(animate)
}





// this portion deals with click detection

canvas.onclick = (e) => {

    bubbles.forEach(bubble => {
        if (detectClick(e.clientX, e.clientY, bubble.bubbleX, bubble.bubbleY, bubble.radius)) {
            bubble.animate = true
            console.log(bubble.animate)
        }

    })

}


function detectClick(clickX, clickY, centerX, centerY, radius) {
    if (clickX >= centerX - radius && clickX <= centerX + radius && clickY >= centerY - radius && clickY <= centerY + radius) {
        return true;
    }
    return false;

}


//reset functionality
const reset = document.getElementById('reset')
reset.onclick = ()=>{
    bubbles.length = 0
    ctx.clearRect(0,0,canvas.width,canvas.height)
    createBubbles(color,gap,radius,bubbles)
    
    
}