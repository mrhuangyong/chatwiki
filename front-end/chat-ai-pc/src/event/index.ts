import { useEventBus } from '@/hooks/event/useEventBus'

const emitter = useEventBus()

window.addEventListener('message', function(event) {
    console.log('Received message from parent:', event.data);
    const res = event.data
    
    if(res.action === 'openWindow'){
        emitter.emit('openWindow', event.data)
    }
    
});