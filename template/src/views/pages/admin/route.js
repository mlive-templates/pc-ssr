// ****************
import dev from './develop'

export default [{
    path: '/',
    redirect: {
        name: 'dev'
    }
}, {
    name: 'dev',
    path: '/admin/dev',
    component: dev
}]