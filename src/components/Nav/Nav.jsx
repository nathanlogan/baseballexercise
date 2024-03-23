import classes from './Nav.module.css'

export default function Nav() {
    return (
      <nav className={classes.container}>
        <ul>
          <li><a href="/">Your Name</a></li>
          <li><a href="/">Your Friend</a></li>
        </ul>
      </nav>
    )
}