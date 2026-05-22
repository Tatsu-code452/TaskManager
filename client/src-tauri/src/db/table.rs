use std::collections::HashMap;

pub trait KeyType: Eq + std::hash::Hash + Clone {}
impl KeyType for String {}
impl KeyType for (String, String) {}

pub trait HasKey<K: KeyType> {
    fn key(&self) -> K;
}

pub fn rebuild_index<T, K>(rows: &[T], index: &mut HashMap<K, usize>)
where
    T: HasKey<K>,
    K: KeyType,
{
    index.clear();
    for (i, row) in rows.iter().enumerate() {
        index.insert(row.key(), i);
    }
}

pub fn add<T, K>(rows: &mut Vec<T>, index: &mut HashMap<K, usize>, row: T) -> Option<T>
where
    T: Clone + HasKey<K>,
    K: KeyType,
{
    let key = row.key();
    if index.contains_key(&key) {
        return None;
    }
    rows.push(row.clone());
    index.insert(key, rows.len() - 1);
    Some(row)
}

pub fn update<T, K>(rows: &mut Vec<T>, index: &HashMap<K, usize>, row: T) -> Option<T>
where
    T: Clone + HasKey<K>,
    K: KeyType,
{
    let key = row.key();
    let idx = *index.get(&key)?;
    rows[idx] = row.clone();
    Some(row)
}

pub fn delete<T, K>(rows: &mut Vec<T>, index: &mut HashMap<K, usize>, key: K) -> Option<T>
where
    T: Clone + HasKey<K>,
    K: KeyType,
{
    let idx = *index.get(&key)?;
    let removed = rows.remove(idx);
    rebuild_index(rows, index);
    Some(removed)
}

pub fn find<'a, T, K>(rows: &'a [T], index: &HashMap<K, usize>, key: K) -> Option<&'a T>
where
    T: HasKey<K>,
    K: KeyType,
{
    index.get(&key).and_then(|&i| rows.get(i))
}

pub fn find_mut<'a, T, K>(rows: &'a mut [T], index: &HashMap<K, usize>, key: K) -> Option<&'a mut T>
where
    T: HasKey<K>,
    K: KeyType,
{
    index.get(&key).and_then(|&i| rows.get_mut(i))
}

pub fn all<T>(rows: &[T]) -> Vec<T>
where
    T: Clone,
{
    rows.to_vec()
}
