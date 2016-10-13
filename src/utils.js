import moment from 'moment';

export function id () {
  return ('00000' + (Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5);
}

export function zeroPad (num, zeros = 2) {
  let numLength = num.toString().length;
  let ret = num.toString();
  while ((zeros - numLength) > 0) {
    ret = '0' + ret;
    numLength++;
  }
  return ret;
}

export function getElapsedTime(baseTime, startedAt, stoppedAt = Date.now()) {
  if (!startedAt) {
    return 0;
  }
  return stoppedAt - startedAt + baseTime;
}

export function formatElapsedTime (elapsed) {
  const duration = moment.duration(elapsed);

  return `${zeroPad(duration.hours())}:${zeroPad(duration.minutes())}:${zeroPad(duration.seconds())}.${zeroPad(duration.milliseconds(), 3)}`;
}

export function exportToCSV (entries) {
  let headerKeys = [];
  const records = Object.keys(entries)
    .reduce((arr, key) => {
      if (!headerKeys.length) {
        headerKeys = Object.keys(entries[key]);
        arr.push(['id'].concat(headerKeys));
      }

      const record = [key];
      for (let i = 0, l = headerKeys.length; i < l; ++i) {
        const propKey = headerKeys[i];
        const prop = entries[key][propKey];
        record.push(prop);
      }
      arr.push(record);

      return arr;
    }, []);

    const link = document.createElement('a');
    link.href = 'data:application/csv;charset=utf-8,' + encodeURIComponent(records.join('\r\n'));
    link.download = 'trackr.csv';
    link.click();
}