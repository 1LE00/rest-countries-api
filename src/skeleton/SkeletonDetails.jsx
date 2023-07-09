import '../details/details.css'
import '../skeleton/skeleton.css'
import { Link } from 'react-router-dom'
import { ReactComponent as Arrow } from '../assets/icons/arrow-left-long-solid.svg'

const SkeletonDetails = ({ toggle }) => {
    return (
        <section className={`details skeleton-details flex flex-column`}>
            <Link to='/countries' className={`go-back flex ${toggle ? 'dark' : 'light'} br-5`}>
                <Arrow />
                <b>Back</b>
            </Link>
            <section className="skeleton-details-section details-section flex flex-column w-100">
                <section className='flag-container skeleton w-100'>
                </section>

                <section className={`country-info skel w-100`}>
                    <section className='country-common-name skeleton skeleton-text'></section>
                    <section className='country-common-name skeleton skeleton-text'></section>
                    <section className="country-stats skel flex flex-column">
                        <section className={`country-stats-one one flex flex-column skeleton skeleton-text`}></section>
                        <section className={`country-stats-one flex flex-column skeleton skeleton-text`}></section>
                        <section className={`country-stats-one flex flex-column skeleton skeleton-text`}></section>
                        <section className={`country-stats-two two flex flex-column skeleton skeleton-text`}></section>
                        <section className={`country-stats-two flex flex-column skeleton skeleton-text`}></section>
                        <section className={`country-stats-two flex flex-column skeleton skeleton-text`}></section>
                        <section className={`country-stats-bottom three flex flex-column skeleton skeleton-text`}></section>
                        <section className={`country-stats-bottom flex flex-column skeleton skeleton-text`}></section>
                        <section className={`country-stats-bottom flex flex-column skeleton skeleton-text`}></section>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default SkeletonDetails