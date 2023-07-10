const KeyValue = ({ keyLabel, value }) => {
    return (
        <dl className='native-name flex'>
            <dt className='key'>{keyLabel}</dt>
            <dd className='value'>{value}</dd>
        </dl>
    );
}

export default KeyValue